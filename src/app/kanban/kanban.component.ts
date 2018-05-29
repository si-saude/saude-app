import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { KanbanService } from './kanban.service';
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
import { SolicitacaoCentralIntegra } from './../model/solicitacao-central-integra';
import { SolicitacaoCentralIntegraFilter } from './../controller/solicitacao-central-integra/solicitacao-central-integra.filter';
import { SolicitacaoCentralIntegraBuilder } from './../controller/solicitacao-central-integra/solicitacao-central-integra.builder';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { StatusSolicitacaoConst } from './../generics/consts/status-solicitacao.const';

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
    private showNothing: boolean;
    private toastParams;
    private globalActions;
    private router: any;
    private responsavel: Profissional;
    private responsaveis: Array<Profissional>;

    constructor( router: Router, private kanbanService: KanbanService,
            private dragulaService: DragulaService) {
        this.toastParams = ['', 4000];
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.showNothing = true;
        this.solicitacaoCentralIntegras = new Array<SolicitacaoCentralIntegra>();
        this.profissional = new ProfissionalSaudeBuilder().initialize(new Profissional());
        this.statuses = new Array<string>();
        this.router = router;
        this.responsavel = new ProfissionalSaudeBuilder().initialize(new Profissional());
        this.responsaveis = new ProfissionalSaudeBuilder().initializeList(new Array<Profissional>());
        dragulaService.drop.subscribe((value) => {
            this.drop(value);
          });
    }
    
    ngOnInit() {
        let component = this;
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
                            let solicitacaoCentralIntegraFilter: SolicitacaoCentralIntegraFilter = new SolicitacaoCentralIntegraFilter();
                            if ( !component.verifyCoordenador() ) {
                                solicitacaoCentralIntegraFilter.setTarefa(new TarefaFilter());
                                solicitacaoCentralIntegraFilter.getTarefa().setResponsavel(new ProfissionalSaudeFilter());
                                solicitacaoCentralIntegraFilter.getTarefa().getResponsavel().setId(component.profissional.getId());
                            }
                            solicitacaoCentralIntegraFilter.setPageSize(Math.pow(2, 31)-1);
                            solicitacaoCentralIntegraFilter.setPageNumber(1);
                            component.kanbanService.getSolicitacoes(solicitacaoCentralIntegraFilter)
                                .then(res => {
                                    component.solicitacaoCentralIntegras = new SolicitacaoCentralIntegraBuilder().cloneList(res.json().list);
                                    this.constructCardsSolicitacoes();
                                    this.setResponsaveis();
                                })
                                .catch(error => {
                                    console.log("Erro ao buscar as solicitações central integra");
                                })
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
        
        this.setStatuses();
        
//        component.getStatuses();
    }
    
    setStatuses() {
        this.statuses = [StatusSolicitacaoConst.ABERTO, 
                         StatusSolicitacaoConst.PLANEJADO, 
                         StatusSolicitacaoConst.EXECUCAO, 
                         StatusSolicitacaoConst.CONCLUIDO, 
                         StatusSolicitacaoConst.CANCELADO, 
                         StatusSolicitacaoConst.AGUARDANDO_INFORMACAO];
    }
    
    setResponsaveis() {
        this.solicitacaoCentralIntegras.forEach(sCI => {
           if ( sCI.getTarefa().getResponsavel() != undefined )
               this.responsaveis.push(sCI.getTarefa().getResponsavel()); 
        });
    }
    
    getStatuses() {
        this.kanbanService.getStatuses()
            .then( res => {
                this.statuses = Object.keys( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    changeResponsavel( id: number ) {
        let solicitacaoCentralIntegraFilter: SolicitacaoCentralIntegraFilter = new SolicitacaoCentralIntegraFilter();
        solicitacaoCentralIntegraFilter.setTarefa(new TarefaFilter());
        solicitacaoCentralIntegraFilter.getTarefa().setResponsavel(new ProfissionalSaudeFilter());
        solicitacaoCentralIntegraFilter.getTarefa().getResponsavel().setId(id);
        this.kanbanService.list(solicitacaoCentralIntegraFilter)
        .then(res => {
            this.solicitacaoCentralIntegras = new SolicitacaoCentralIntegraBuilder().cloneList(res.json().list);
        })
        .catch(error => {
            console.log("Erro ao buscar as solicitações central integra");
        })
        
    }
    
    drop(valor) {
        let id = $(valor[1]).attr('name').split("-")[1];
        let changeStatus = $(valor[2]).attr('id');
        let solicitacaoCentralIntegra: SolicitacaoCentralIntegra = this.solicitacaoCentralIntegras.
            find(sCI => sCI.getId() == Number(id));
        solicitacaoCentralIntegra.setStatus(changeStatus);
    }
    
    constructCardsSolicitacoes() {
        this.solicitacaoCentralIntegras.forEach(sCI => {
            $(".body-kanban-"+sCI.getStatus()).append("<div name='card-"+ sCI.getId() +"' class='card card-"+ sCI.getId() + "' [dragula]='card'>" + 
                    "<div class='card-content'>"+ this.showShortDescricao(sCI.getDescricao()) + "</div> " +
            		"</div> ");
        })
        this.solicitacaoCentralIntegras.forEach(sCI => {
            $(".card-"+sCI.getId()).dblclick(function() {
                console.log('teste 1');
            });
        })
    }
        
    showShortDescricao( descricao: string ) {
        if ( descricao.length > 100 )
            return descricao.substring(0, 97)+"...";
        else return descricao;
    }
    
    verifyStatus(status: string) {
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