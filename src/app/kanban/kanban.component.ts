import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";
import { DragulaService } from 'ng2-dragula';

import { Usuario } from './../model/usuario';
import { UsuarioBuilder } from './../controller/usuario/usuario.builder';
import { UsuarioFilter } from './../controller/usuario/usuario.filter';
import { Tarefa } from './../model/tarefa';
import { TarefaFilter } from './../controller/tarefa/tarefa.filter';
import { TarefaBuilder } from './../controller/tarefa/tarefa.builder';
import { Profissional } from './../model/profissional';
import { ProfissionalSaudeFilter } from './../controller/profissional-saude/profissional-saude.filter';
import { ProfissionalSaudeBuilder } from './../controller/profissional-saude/profissional-saude.builder';
import { Empregado } from './../model/empregado';
import { EmpregadoFilter } from './../controller/empregado/empregado.filter';
import { EmpregadoBuilder } from './../controller/empregado/empregado.builder';
import { EquipeBuilder } from './../controller/equipe/equipe.builder';
import { SolicitacaoCentralIntegra } from './../model/solicitacao-central-integra';
import { SolicitacaoCentralIntegraFilter } from './../controller/solicitacao-central-integra/solicitacao-central-integra.filter';
import { SolicitacaoCentralIntegraBuilder } from './../controller/solicitacao-central-integra/solicitacao-central-integra.builder';
import { SolicitacaoCentralIntegraService } from './../controller/solicitacao-central-integra/solicitacao-central-integra.service';
import { SolicitacaoCentralIntegraUtil } from './../generics/utils/solicitacao-central-integra.util';
import { HttpUtil } from './../generics/utils/http.util';
import { BooleanFilter } from './../generics/boolean.filter';
import { TextUtil } from './../generics/utils/text.util';

@Component( {
    selector: 'app-kanban',
    templateUrl: './kanban.html',
    styleUrls: ['./kanban.css']
} )
export class KanbanComponent {
    private profissional: Profissional;
    private usuario: Usuario;
    private solicitacaoCentralIntegras: Array<SolicitacaoCentralIntegra>;
    private statuses: Array<string>;
    private router: any;
    private responsavel: Profissional;
    private responsaveis: Array<Profissional>;
    private solicitacaoCentralIntegraUtil: SolicitacaoCentralIntegraUtil;
    private httpUtil: HttpUtil;
    private idResponsavel: number = 0;

    private showPreload: boolean;
    private textUtil: TextUtil;

    constructor( router: Router, private kanbanService: SolicitacaoCentralIntegraService,
        private dragulaService: DragulaService ) {
        dragulaService.setOptions('card', {
            revertOnSpill: true
        } );
        dragulaService.drop.subscribe(( value ) => {
            this.drop( value );
        } );
        this.solicitacaoCentralIntegras = new Array<SolicitacaoCentralIntegra>();
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.router = router;
        this.statuses = new Array<string>();
        this.responsavel = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.responsaveis = new ProfissionalSaudeBuilder().initializeList( new Array<Profissional>() );
        this.solicitacaoCentralIntegraUtil = new SolicitacaoCentralIntegraUtil();
        this.httpUtil = new HttpUtil();
        this.textUtil = new TextUtil();
        
        this.showPreload = false;
    }

    ngOnInit() {
        let component = this;
        this.showPreload = true;
        if ( localStorage.getItem( 'usuario-id' ) != undefined ) {
            component.kanbanService.getUsuario( Number( localStorage.getItem( 'usuario-id' ) ) )
                .then( res => {
                    component.usuario = new UsuarioBuilder().clone( res.json() );
                    let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
                    let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                    empregadoFilter.getPessoa().setCpf( component.usuario.getPessoa().getCpf() );
                    profissionalFilter.setEmpregado( empregadoFilter );
                    component.kanbanService.getProfissional( profissionalFilter )
                        .then( res => {
                            component.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                            component.kanbanService.getEquipe( component.profissional.getEquipe().getId() )
                                .then( res => {
                                    this.showPreload = false;
                                    this.profissional.setEquipe( new EquipeBuilder().clone( res.json() ) );
                                    component.getSolicitacoes();
                                } )
                                .catch( error => {
                                    console.log( "Erro ao buscar equipe do profissional." );
                                } )
                        } )
                        .catch( error => {
                            console.log( "Erro no servidor ao buscar o profissional." );
                        } )
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario." );
                } )
        } else {
            component.router.navigate( ["login"] );
        }
        
        this.getStatuses();

    }

    //generalizar solicitacaoCentralIntegraUtil
    getAnexo( solicitacaoCentralIntegra: SolicitacaoCentralIntegra ) {
        this.showPreload = true;

        this.kanbanService.getAnexo( solicitacaoCentralIntegra.getId() )
            .then( res => {
                this.showPreload = false;
                this.httpUtil.downloadFile( res, solicitacaoCentralIntegra.
                    getTarefa().getCliente().getPessoa().getNome() + ".zip" );
            } )
            .catch( error => {
                this.showPreload = false;
                if ( typeof error.text === "function" ) {
                    this.textUtil.showTextToast(error.text(), 6000);
                    return;
                } else console.log( "Erro ao buscar o anexo: " + error );
            } )
    }
    
    getStatuses() {
        this.kanbanService.getStatusSolicitacao()
            .then(res => {
                this.statuses = Object.keys( res.json() );
            })
            .catch(error => {
                console.log("Erro ao retornar os status.");
            })
    }

    setResponsaveis() {
        let id = $( "select[name=responsavel]" ).val();
        this.responsaveis = new Array<Profissional>();
        this.solicitacaoCentralIntegras.forEach( sCI => {
            if ( sCI.getTarefa().getResponsavel() != undefined ) {
                let solicitacao = this.responsaveis.find( r => r.getId() == sCI.getTarefa().getResponsavel().getId() );
                if ( solicitacao == undefined )
                    this.responsaveis.push( sCI.getTarefa().getResponsavel() );
            }
        } );
    }

    getSolicitacoes() {
        let solicitacaoCentralIntegraFilter: SolicitacaoCentralIntegraFilter = new SolicitacaoCentralIntegraFilter();
        solicitacaoCentralIntegraFilter.setConcluido(new BooleanFilter());
        solicitacaoCentralIntegraFilter.getConcluido().setValue(2);
        if ( !this.verifyCoordenador() ) {
            solicitacaoCentralIntegraFilter.setTarefa( new TarefaFilter() );
            solicitacaoCentralIntegraFilter.getTarefa().setResponsavel( new ProfissionalSaudeFilter() );
            solicitacaoCentralIntegraFilter.getTarefa().getResponsavel().setId( this.profissional.getId() );
        }
        solicitacaoCentralIntegraFilter.setPageSize( Math.pow( 2, 31 ) - 1 );
        solicitacaoCentralIntegraFilter.setPageNumber( 1 );
        this.kanbanService.getSolicitacoes( solicitacaoCentralIntegraFilter )
            .then( res => {
                this.solicitacaoCentralIntegras = new SolicitacaoCentralIntegraBuilder().cloneList( res.json().list );
                this.constructCardsSolicitacoes();
                this.setResponsaveis();
            } )
            .catch( error => {
                console.log( "Erro ao buscar as solicitcoes central integra" );
            } )
    }

    changeResponsavel() {
        let solicitacaoCentralIntegraFilter: SolicitacaoCentralIntegraFilter = new SolicitacaoCentralIntegraFilter();
        solicitacaoCentralIntegraFilter.setTarefa( new TarefaFilter() );
        solicitacaoCentralIntegraFilter.getTarefa().setResponsavel( new ProfissionalSaudeFilter() );
        solicitacaoCentralIntegraFilter.getTarefa().getResponsavel().setId( this.idResponsavel );
        solicitacaoCentralIntegraFilter.setPageSize( Math.pow( 2, 31 ) - 1 );
        solicitacaoCentralIntegraFilter.setPageNumber( 1 );
        solicitacaoCentralIntegraFilter.setConcluido(new BooleanFilter());
        solicitacaoCentralIntegraFilter.getConcluido().setValue(2);
        this.kanbanService.list( solicitacaoCentralIntegraFilter )
            .then( res => {
                this.solicitacaoCentralIntegras = new SolicitacaoCentralIntegraBuilder().cloneList( res.json().list );
                this.constructCardsSolicitacoes();
            } )
            .catch( error => {
                console.log( "Erro ao buscar as solicitacoees central integra" );
            } )
    }
    
    allResponsaveis() {
        this.idResponsavel = 0;
        this.getSolicitacoes();
    }
    
    getListSolicitacoes( solicitacaoCentralIntegraFilter ) {
        this.kanbanService.list( solicitacaoCentralIntegraFilter ) 
            .then( res => {
                this.solicitacaoCentralIntegras = new SolicitacaoCentralIntegraBuilder().cloneList( res.json().list );
                this.constructCardsSolicitacoes();
            } )
            .catch( error => {
                console.log( "Erro ao buscar as solicitacoees central integra" );
            } )
    }

    drop( valor ) {
        let component = this;
        let id = $( valor[1] ).attr( 'name' ).split( "-" )[1];
        let changeStatus = $( valor[2] ).attr( 'id' );
        let solicitacaoCentralIntegra: SolicitacaoCentralIntegra = this.solicitacaoCentralIntegras.
            find( sCI => sCI.getId() == Number( id ) );
        solicitacaoCentralIntegra.setStatus(changeStatus);
        this.kanbanService.submit( solicitacaoCentralIntegra )
            .then( res => {
                let solicitacao = new SolicitacaoCentralIntegraBuilder().clone( res.json() );
                solicitacaoCentralIntegra = this.solicitacaoCentralIntegras.
                    find( sCI => sCI.getId() == Number( id ) );
                solicitacaoCentralIntegra.setVersion(solicitacao.getVersion());
                solicitacaoCentralIntegra.getTarefa().setVersion(solicitacao.getTarefa().getVersion());
                solicitacaoCentralIntegra.getTarefa().setInicio(solicitacao.getTarefa().getInicio());
                solicitacaoCentralIntegra.getTarefa().setStatus(solicitacao.getTarefa().getStatus());
            } )
            .catch( error => {
                let previewStatus = $( valor[3] ).attr( 'id' );
                component.textUtil.showTextToast(error.text(), 4000);
                solicitacaoCentralIntegra.setStatus(previewStatus);
                component.autoChangeStatusCard(valor);
                console.log("Erro ao atualizar a solicitacoes: "+error.text());
            } )
    }
    
    autoChangeStatusCard(valor) {
        $( ".body-kanban-" + this.getShortStatus($(valor[3]).attr('id')) ).append($(valor[1]));
    }

    constructCardsSolicitacoes() {
        let component = this;
        this.removeChildrens();
        this.solicitacaoCentralIntegras.forEach( sCI => {
            $( ".body-kanban-" + component.getShortStatus( sCI.getStatus() ) ).append(
                "<div style='margin-left: 5%; width: 80%;"+ this.solicitacaoCentralIntegraUtil.setStyleAtrasado(sCI)+"' name='card-" + sCI.getId() + "' class='row card card-" + sCI.getId() + "' [dragula]='card'>" +
                "<div class='col s10 card-content'>" + this.textUtil.shortText( sCI.getDescricao() ) + "</div> " +
                "<i style='cursor: pointer;' class='small material-icons icon icon-" + sCI.getId() + "'>file_download</i>" +
                "</div> " );
        } )
        this.solicitacaoCentralIntegras.forEach( sCI => {
            $( ".card-" + sCI.getId() ).dblclick( function() {
                if ( component.verifyCoordenador() )
                    window.open("/solicitacao-central-integra/editar/"+sCI.getId() );
                else window.open("/solicitacao-central-integra/observacao/"+sCI.getId() );
            }).mouseenter(function() {
                component.textUtil.showTextToast(sCI.getDescricao(), 60000);
            }).mouseleave(function() {
                component.textUtil.closeTooltip();
            });
            $( ".icon-" + sCI.getId() ).click( function() {
                component.getAnexo( sCI );
            } );
        } )
    }
    
    getShortStatus( status: string ) {
        if ( status.includes("EXECU") )
            return "EXECU";
        else if ( status.includes("CONCLU") )
            return "CONCLU";
        else if ( status.includes("AGUARDANDO INFORMA") )
            return "AGUARDANDOINFORMA";
        else return status;
    }

    removeChildrens() {
        this.statuses.forEach( s => {
            $( ".body-kanban-" + this.getShortStatus(s) ).empty();
        } )
    }

    verifyStatus( status: string ) {
        if ( status == "ABERTO" && !this.verifyCoordenador() )
            return false;
        return true;
    }

    verifyCoordenador() {
        if ( this.profissional.getEquipe().getCoordenador().getId() == this.profissional.getId() )
            return true;
        else return false;
    }
}