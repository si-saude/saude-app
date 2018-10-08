import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { Profissional } from './../../../model/profissional';
import { MaterializeAction } from "angular2-materialize";

import { DateFilter } from './../../../generics/date.filter';
import { FilaAtendimentoOcupacional } from './../../../model/fila-atendimento-ocupacional';
import { GlobalVariable } from './../../../global';
import { Atendimento } from './../../../model/atendimento';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AtendimentoBuilder } from './../../atendimento/atendimento.builder';
import { LocalizacaoBuilder } from './../../localizacao/localizacao.builder';
import { AtendimentoService } from './../../atendimento/atendimento.service';
import { Localizacao } from './../../../model/localizacao';
import { DateUtil } from '../../../generics/utils/date.util';
import { ModalFilaAtendimentoOcupacionalComponent } from './../../../includes/modal-fila-atendimento-ocupacional/modal-fila-atendimento-ocupacional.component';
import { ModalTarefaComponent } from './../../../includes/modal-tarefa/modal-tarefa.component';
import { ModalFilaEsperaOcupacionalComponent } from './../../../includes/modal-fila-espera-ocupacional/modal-fila-espera-ocupacional.component';
import { FichaColetaUtil } from './../../../generics/utils/ficha-coleta.util';
import { PlanejamentoUtil } from './../../../generics/utils/planejamento.util';
import { TriagemUtil } from './../../../generics/utils/triagem.util';
import { Util } from './../../../generics/utils/util';

@Component( {
    selector: 'app-atendimento-avulso-form',
    templateUrl: './atendimento-avulso-form.html',
    styleUrls: ['./atendimento-avulso-form.css', './../../../../assets/css/form-component.css']
} )
export class AtendimentoAvulsoFormComponent extends GenericFormComponent implements OnInit {

    atendimento: Atendimento;
    private localizacoes: Array<Localizacao>;
    private usuario: Usuario;
    private profissional: Profissional;
    private atendimentoCarregado;
    private fichaColetaUtil: FichaColetaUtil;
    private planejamentoUtil: PlanejamentoUtil;
    private triagemUtil: TriagemUtil;
    
    timeActions ;
    @ViewChild( ModalFilaAtendimentoOcupacionalComponent ) modalFilaAtendimento: ModalFilaAtendimentoOcupacionalComponent;
    @ViewChild( ModalFilaEsperaOcupacionalComponent ) modalFilaEspera: ModalFilaEsperaOcupacionalComponent;
    @ViewChild( ModalTarefaComponent ) modalTarefa: ModalTarefaComponent;


    constructor( private route: ActivatedRoute,
        private atendimentoService: AtendimentoService,
        router: Router ) {
        super( atendimentoService, router );

        this.goTo = "atendimento-avulso";
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.atendimento = new AtendimentoBuilder().initialize( this.atendimento );
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.timeActions = new EventEmitter<string|MaterializeAction>();
        this.atendimentoCarregado =  false;
        this.fichaColetaUtil = new FichaColetaUtil();
        this.planejamentoUtil = new PlanejamentoUtil();
        this.triagemUtil = new TriagemUtil();
        this.atendimentoCarregado = false;
    }

    ngOnInit() {
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            this.atendimentoService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    this.usuario = new UsuarioBuilder().clone( res.json() );
                    if ( this.usuario.getId() > 0 && this.usuario.getPessoa() != undefined ) {
                        let pessoaFilter: PessoaFilter = new PessoaFilter();
                        pessoaFilter.setCpf( this.usuario.getPessoa().getCpf() );
                        let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
                        empregadoFilter.setPessoa( pessoaFilter );
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( empregadoFilter );

                        this.atendimentoService.getProfissional( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                } else {
                                    this.router.navigate( ["/home"] );
                                    return;
                                }
                            } )
                            .catch( error => {
                                console.log( "Erro no servidor ao buscar o profissional. Tentar mais tarde." );
                                this.catchConfiguration( error );
                            } )
                    } else {
                        this.router.navigate( ["/login"] );
                        return;
                    }
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario." );
                    this.catchConfiguration( error );
                } )
        } else {
            console.log( "Usuario nao logado." );
            this.router.navigate( ["/login"] );
        }

    }    
    setTarefa(event){        
        this.atendimento.getTarefa().getInicioCustomDate().setAppDate(
                this.atendimento.getFilaAtendimentoOcupacional().getInicioCustomDate().getAppDate());
        this.atendimento.getTarefa().getFimCustomDate().setAppDate(
                this.atendimento.getFilaAtendimentoOcupacional().getInicioCustomDate().getAppDate());   
    }
    
    setTarefaFilter(event){
        if(event != null){
           let periodo : DateFilter = new DateFilter();
           periodo= event;     
           this.modalTarefa.setPeriodoFilter(periodo);           
        }     
    }
    carregarComplementoAtendimento(){ 
       this.atendimentoCarregado = true;
        this.atendimento.getTarefa().setResponsavel(new ProfissionalSaudeBuilder().clone(this.profissional));
        this.showPreload = true;
        this.atendimentoService.getComplementoAtendimentoAvulso( new AtendimentoBuilder().clone( this.atendimento ) )
          .then( res => {
              this.atendimento = new AtendimentoBuilder().clone( res.json() );
              this.showPreload = false;
          } )
          .catch( error => {
              this.processReturn( false, error );
          } )
        
    }
    save() {        
        if ( !this.triagemUtil.verifyValidTriagens( this.atendimento.getTriagens() ) ) {
            this.toastParams = ["Por favor, preencha os campos de Triagem exigidos", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }

        if ( !this.planejamentoUtil.verifyPlanejamento( 
                this.atendimento.getTriagens(), this.profissional.getEquipe().getId() ) ) {
            this.toastParams = ["Por favor, preencha os campos do Planejamento exigidos", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }     
        
        this.showPreload = true;
        this.canDeactivate = true;
        this.atendimentoService.finalizarRetroativo(new AtendimentoBuilder().clone( this.atendimento ) )
            .then( res => {
                this.msgConfirmSave= "Atendimento finalizado";
                this.showConfirmSave = true;
                this.showPreload = false;
            } )
            .catch( error => {
                this.processReturn( false, error );
            } )
    }

}