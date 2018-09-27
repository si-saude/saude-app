import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { GlobalVariable } from './../../../global';
import { Atestado } from './../../../model/atestado';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { Servico } from './../../../model/servico';
import { ServicoBuilder } from './../../servico/servico.builder';
import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { Diagnostico } from './../../../model/diagnostico';
import { Exame } from './../../../model/exame';
import { ExameBuilder } from './../../exame/exame.builder';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AtestadoBuilder } from './../atestado.builder';
import { AtestadoService } from './../atestado.service';
import { DiagnosticoAtestadoAutocomplete } from './../../diagnostico/diagnostico-atestado.autocomplete';
import { EquipeFilter } from './../../equipe/equipe.filter';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { ServicoFilter } from './../../servico/servico.filter';
import { DiagnosticoFilter } from './../../diagnostico/diagnostico.filter';
import { DiagnosticoBuilder } from './../../diagnostico/diagnostico.builder';
import { Tarefa } from './../../../model/tarefa';
import { TarefaBuilder } from './../../tarefa/tarefa.builder';
import { TarefaFilter } from './../../tarefa/tarefa.filter';
import { TarefaService } from './../../tarefa/tarefa.service';
import { MotivoRecusaAtestado } from './../../../model/motivo-recusa-atestado';
import { MotivoRecusaAtestadoBuilder } from './../../motivo-recusa-atestado/motivo-recusa-atestado.builder';
import { MotivoRecusaAtestadoFilter } from './../../motivo-recusa-atestado/motivo-recusa-atestado.filter';
import { ModalTarefaSimpleComponent } from './../../../includes/modal-tarefa-simple/modal-tarefa-simple.component';
import { ModalExameComponent } from './../../../includes/modal-exame/modal-exame.component';
import { ModalConfirmComponent } from './../../../includes/modal-confirm/modal-confirm.component';
import { ModalAuditoriaAtestadoComponent } from './../../../includes/modal-auditoria-atestado/modal-auditoria-atestado.component';
import { HttpUtil } from './../../../generics/utils/http.util';

@Component( {
    selector: 'app-atestado-form',
    templateUrl: './atestado-form.html',
    styleUrls: ['./atestado-form.css', './../../../../assets/css/form-component.css']
} )
export class AtestadoFormComponent extends GenericFormComponent implements OnInit {
    @ViewChild( 'anexo' ) inputElAnexo: ElementRef;
    @ViewChild( ModalTarefaSimpleComponent ) modalTarefa: ModalTarefaSimpleComponent;
    @ViewChild( ModalExameComponent ) modalExame: ModalExameComponent;
    @ViewChild( ModalConfirmComponent ) modalConfirm: ModalConfirmComponent;
    @ViewChild( ModalAuditoriaAtestadoComponent ) modalAuditoriaAtestado: ModalAuditoriaAtestadoComponent;
    private atestado: Atestado;
    private statuses: Array<string>;
    private statusesTarefa: Array<string>;
    private autocompleteDiagnostico: DiagnosticoAtestadoAutocomplete;
    private profissional: Profissional;
    private usuario: Usuario;
    private equipes: Array<Equipe>;
    private modalConfirmButton: string;
    private httpUtil: HttpUtil;
    private agendamentoFilter: TarefaFilter;
    private motivoRecusas: Array<MotivoRecusaAtestado>;
    private statusAlteradoHomologado = false;
    
    constructor( private route: ActivatedRoute,
        private atestadoService: AtestadoService,
        router: Router ) {
        super( atestadoService, router );

        this.goTo = "atestado";
        this.atestado = new AtestadoBuilder().initialize( this.atestado );
        this.statuses = new Array<string>();
        this.statusesTarefa = new Array<string>();
        this.autocompleteDiagnostico = new DiagnosticoAtestadoAutocomplete(
                this.atestadoService.getDiagnosticoService(), new DiagnosticoFilter());
        this.httpUtil = new HttpUtil();
        
        this.profissional = new ProfissionalSaudeBuilder().initialize(this.profissional);
        this.usuario = new UsuarioBuilder().initialize(this.usuario);
        this.equipes = new EquipeBuilder().initializeList(this.equipes);
        this.agendamentoFilter = new TarefaFilter();
        this.motivoRecusas = new MotivoRecusaAtestadoBuilder().initializeList(new Array<MotivoRecusaAtestado>());
    }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;
                    
                    this.service.get( id )
                        .then( res => {
                            this.atestado = new AtestadoBuilder().clone( res.json() );
                            this.atestado.getTarefa().setCliente(this.atestado.getEmpregado());
                            
                            this.atestadoService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                            .then( res => {
                                this.usuario = new UsuarioBuilder().clone( res.json() );
                                if ( this.usuario.getId() > 0 && this.usuario.getPessoa() != undefined ) {
                                    let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                                    profissionalFilter.setEmpregado(new EmpregadoFilter());
                                    profissionalFilter.getEmpregado().setPessoa(new PessoaFilter());
                                    profissionalFilter.getEmpregado().getPessoa().setCpf(this.usuario.getPessoa().getCpf());
                                    
                                    this.atestadoService.getProfissional( profissionalFilter )
                                        .then( res => {
                                            this.showPreload = false;
                                            if ( res.json().list[0] != undefined )
                                                this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                                this.atestado.setProfissional(this.profissional);
                                            
                                            if ( this.atestado.getStatus().includes("CNICA") && 
                                                    !this.atestado.getTarefa().getResponsavel() && 
                                                    ( this.profissional.getEquipe().getAbreviacao() == "ODO" || 
                                                            this.profissional.getEquipe().getAbreviacao() == "MED" ) ) {
                                                if ( !this.atestado.getTarefa() )
                                                    this.atestado.setTarefa(new TarefaBuilder().initialize(new Tarefa()));
                                                this.atestado.getTarefa().setResponsavel(this.profissional);
                                            }
                                            
                                            let diagnosticoFilter: DiagnosticoFilter = new DiagnosticoFilter();
                                            diagnosticoFilter.getInativo().setValue(2);
                                            if ( this.atestado.getTarefa() != undefined && 
                                                    this.atestado.getTarefa().getEquipe().getId() > 0 ) {
                                                
                                                diagnosticoFilter.getEixo().setEquipe(new EquipeFilter());
                                                diagnosticoFilter.getEixo().getEquipe().setAbreviacao(
                                                        this.atestado.getTarefa().getEquipe().getAbreviacao());
                                            }
                                            this.autocompleteDiagnostico = new DiagnosticoAtestadoAutocomplete(
                                                    this.atestadoService.getDiagnosticoService(), diagnosticoFilter);
                                            
                                            this.agendamentoFilter.setServico(new ServicoFilter());
                                            this.agendamentoFilter.getServico().setGrupo("ATENDIMENTO OCUPACIONAL");
                                            this.agendamentoFilter.getServico().setCodigo("0007");
                                            this.agendamentoFilter.setCliente(new EmpregadoFilter());
                                            this.agendamentoFilter.getCliente().setId(this.atestado.getEmpregado().getId());
                                            this.agendamentoFilter.setStatus("ABERTA");
                                            this.agendamentoFilter.setPageNumber(1);
                                            this.agendamentoFilter.setPageSize(Math.pow(2, 31)-1);
                                        } )
                                        .catch( error => {
                                            console.log( "Erro no servidor ao buscar o profissional. Tentar mais tarde." );
                                            this.catchConfiguration( error );
                                        } )
                                }
                            } )
                            .catch( error => {
                                console.log( "Erro no servidor ao buscar o usuario." );
                                this.catchConfiguration( error );
                            } )
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getStatuses();
        this.getEquipes();
        this.getMotivoRecusas();
        this.getStatusesTarefa();
    }
    
    getEquipes() {
        this.atestadoService.getEquipeService().getMedicinaOdonto()
            .then( res => {
                this.equipes = new EquipeBuilder().cloneList(res.json().list);
            } )
            .catch( error => {
                console.log( "Erro ao retornar status." );
            } )
    }
    
    getStatuses() {
        this.atestadoService.getStatuses()
            .then( res => {
                this.statuses = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( "Erro ao retornar status." );
            } )
    }
    
    getMotivoRecusas() {
        let motivoRecusaFilter = new MotivoRecusaAtestadoFilter();
        motivoRecusaFilter.setPageNumber(1);
        motivoRecusaFilter.setPageSize(Math.pow(2, 31)-1);
        this.atestadoService.getMotivoRecusaService().list(motivoRecusaFilter)
            .then(res => {
                this.motivoRecusas = new MotivoRecusaAtestadoBuilder().cloneList(res.json().list);
            })
            .catch(error => {
                console.log("Erro ao retornar motivos de recusa.");
            })
    }
        
    getStatusesTarefa() {
        this.atestadoService.getTarefaService().getStatusTarefa()
            .then(res => {
                this.statusesTarefa = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log( "Erro ao retornar status da tarefa." );
            })
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

    save() {
        super.save( new AtestadoBuilder().clone(this.atestado) );
    }


    showTextToast( text, time = 60000 ) {
        if ( text == "" ) return;

        this.toastParams = [text, time];
        this.globalActions.emit( 'toast' );
    }

    closeTooltip() {
        $( ".toast" ).remove();
    }
    
    changeEquipe(evento) {
        this.atestado.setCid(new DiagnosticoBuilder().initialize(new Diagnostico()));
        this.atestado.setAgendamento(new TarefaBuilder().initialize(new Tarefa()));
    }
    
    verifyAuditar() {
        if ( !this.atestado.getStatus() || !this.atestado.getStatus().includes("ADMINISTRATIVA") || 
                ( this.atestado.getPresencial() && 
                        ( !this.atestado.getAgendamento() || !this.atestado.getAgendamento().getId() || this.atestado.getAgendamento().getId() == 0) ) )
            return true;
        return false;
    }
    
    auditar() {
        this.atestado.setDataAuditoria(new Date());
        this.atestado.setStatus(this.statuses.find(s => s.includes("CNICA")));
        this.recalcularLimitesDatas();
    }
    
    disabledTab( tab: string ) {
        switch(tab) {
            case "analiseAdministrativa": {
                if ( this.profissional.getEquipe().getAbreviacao() != 'CAT' ) 
                    return 'disabled'
                return '';
            }
            case "analiseTecnica" : {
                if ( this.profissional.getEquipe().getAbreviacao() != this.atestado.getTarefa().getEquipe().getAbreviacao() ) 
                    return 'disabled';
                return '';
            }
            case "arquivo": {
                if ( this.profissional.getEquipe().getAbreviacao() != "ARQ" ) 
                    return 'disabled';
                return '';
            }
        }
    }
    
    verifyRecusarAnaliseAdministrativa() {
        if ( this.atestado.getStatus() != this.statuses.find( s => s.includes("ADMINISTRATIVA") ) ) 
            return true;
    }
    
    recusarAnaliseAdministrativa() {
        this.atestado.setStatus("RECUSADO");
        this.atestado.getTarefa().setFim(new Date());
        this.atestado.getTarefa().setStatus(this.statusesTarefa.find(s => s.includes("CONCLU")));
        this.atestado.getTarefa().setResponsavel(this.profissional);
        
        let filter : EquipeFilter = new EquipeFilter();
        filter.setPageNumber(1);
        filter.setPageSize(1);
        filter.setAbreviacao("CAT");
        
        this.atestadoService.getEquipeService().list(filter)
            .then(res => {
                let equipe:Equipe = res.json().list[0];
                this.atestado.getTarefa().setEquipe(new EquipeBuilder().clone(equipe));
                this.equipes.push(equipe);
            })
            .catch(error => {
                console.log("Erro ao buscar equipe.");
            });
    }
    
    verifyRecusarAtestado() {
        if ( this.atestado.getStatus() != this.statuses.find( s => s.includes("CNICA") ) )
            return true;
    }
    
    recusarAtestado() {
        if ( this.atestado.getTarefa() ) {
            this.atestado.getTarefa().setStatus(this.statusesTarefa.find(s => s.includes("CONCLU")));
            this.atestado.getTarefa().setFim(new Date());
            this.atestado.getTarefa().setResponsavel(this.profissional);
        }
        this.atestado.setStatus("RECUSADO");
    }
    
    homologarAtestado( evento ) {
        this.atestado.setStatus("HOMOLOGADO");
        this.atestado.setDataHomologacao(new Date());
        
        if ( this.atestado.getTarefa() ) {
            this.atestado.getTarefa().setFim(new Date());
            this.atestado.getTarefa().setStatus(this.statusesTarefa.find(s => s.includes("CONCLU")) );
            this.atestado.getTarefa().setResponsavel(this.profissional);
        }
        
        if ( this.atestado.getAgendamento() == undefined ) 
            this.atestado.setAgendamento(new TarefaBuilder().initialize(this.atestado.getAgendamento()));
        
        this.recalcularLimitesDatas();
    }
    
    verifyHomologarAtestado() {
        if ( ( this.atestado.getStatus() && !this.atestado.getStatus().includes("CNICA") )|| 
                ( this.atestado.getPresencial() && 
                        this.atestado.getAgendamento() && this.atestado.getAgendamento().getStatus() != undefined &&
                        !this.atestado.getAgendamento().getStatus().includes("CONCLU") ) ||
                !this.atestado.getLancamentoSd2000() )
                    return true;  
    }
    
    addExame(exame: Exame) {
        if ( this.atestado.getExamesConvocacao() &&
                this.atestado.getExamesConvocacao().find(e => e.getCodigo() == exame.getCodigo()) ) {
            this.showTextToast("Exame adicionado anteriormente.", 4000);
            return;
        }
        
        if ( this.atestado.getExamesConvocacao() == undefined )
            this.atestado.setExamesConvocacao(new ExameBuilder().initializeList(this.atestado.getExamesConvocacao()));
        
        this.atestado.getExamesConvocacao().push(new ExameBuilder().clone(exame));
    }
    
    setAusenciaExames(evento) {
        if ( evento.target.checked ) {
            this.modalConfirm.setMensagem("Deseja realmente excluir os exames?");
            this.modalConfirmButton = 'ausencia';
            this.modalConfirm.openModal();
        }
    }
    
    cancelarAgendamento() {
        this.modalConfirmButton = 'cancelar';
        this.modalConfirm.setMensagem("Deseja realmente cancelar o agendamento?");
        this.modalConfirm.openModal();
    }
    
    functionModalConfirm( evento ) {
        switch( this.modalConfirmButton ) {
            case "ausencia": 
                evento ? this.atestado.setExamesConvocacao(new Array<Exame>()) : this.atestado.setAusenciaExames(false);
                break;
            case "cancelar":
                if ( evento )
                    this.atestadoService.cancelarAgendamento( new AtestadoBuilder().clone( this.atestado ) )
                        .then(res => {
                            this.atestado = new AtestadoBuilder().clone(res.json());
                            this.showTextToast("Agendamento cancelado com sucesso.", 4000);
                        })
                        .catch(error => {
                            this.showTextToast("Erro ao cancelar o agendamento.", 4000);
                        })
                break;
        }       
    }
    
    arquivar() {
        this.atestado.setStatus("ARQUIVADO");
    }
    
    setAgendamento(tarefa: Tarefa) {
        this.atestado.setAgendamento(tarefa);
    }
    
    getAnexo() {
        this.showPreload = true;
        this.atestadoService.getAnexo( this.atestado.getId() )
            .then( res => {
                this.showPreload = false;
                this.httpUtil.downloadFile( res, "atestado.pdf" );
            } )
            .catch( error => {
                this.showPreload = false;
                if ( typeof error.text === "function" ) {
                    this.toastParams = [error.text(), 6000];
                    this.globalActions.emit( 'toast' );
                    return;
                } else console.log( "Erro ao buscar o anexo: " + error );
            } )
    }
    
    getRelatorioMedico() {
        this.showPreload = true;
        this.atestadoService.getRelatorioMedico( this.atestado.getId() )
            .then( res => {
                this.showPreload = false;
                this.httpUtil.downloadFile( res, "relatorio-medico.pdf" );
            } )
            .catch( error => {
                this.showPreload = false;
                if ( typeof error.text === "function" ) {
                    this.toastParams = [error.text(), 6000];
                    this.globalActions.emit( 'toast' );
                    return;
                } else console.log( "Erro ao buscar o anexo: " + error );
            } )
    }
    
    clickCid() {
        if ( this.atestado.getTarefa() && 
                this.atestado.getTarefa().getEquipe() && 
                this.atestado.getTarefa().getEquipe().getId() > 0 ) {
            let eqp = this.equipes.find(e => e.getId() == this.atestado.getTarefa().getEquipe().getId());
            let diagnosticoFilter: DiagnosticoFilter = new DiagnosticoFilter();
            diagnosticoFilter.getInativo().setValue(2);
            diagnosticoFilter.getEixo().setEquipe(new EquipeFilter());
            diagnosticoFilter.getEixo().getEquipe().setAbreviacao(eqp.getAbreviacao());
            this.autocompleteDiagnostico = new DiagnosticoAtestadoAutocomplete(
                    this.atestadoService.getDiagnosticoService(), diagnosticoFilter);
        }
    }
    
    clickAgendamento() {
        if ( this.atestado.getTarefa() && this.atestado.getTarefa().getEquipe().getId() > 0 ) {
            this.agendamentoFilter.setEquipe(new EquipeFilter());
            this.agendamentoFilter.getEquipe().setId(this.atestado.getTarefa().getEquipe().getId());
            this.modalTarefa.callModalTarefa(this.agendamentoFilter);
            this.modalTarefa.openModalTarefa();
        }
    }
    
    changeNumeroDias(evento){
        if( evento.target.value >= 5 ){
            this.atestado.setPresencial(true)
        } else {
            this.atestado.setPresencial(false)
        }
        
        this.recalcularLimitesDatas();
    }
    
    changePresencialAnaliseTecnica( evento ) {
        if ( evento.target.checked ) {
            this.atestado.setStatus(this.statuses.find(s => s.includes("ADMINISTRATIVA")));
            this.atestado.setPresencial(true);
        }
        
        setTimeout(() => {
            this.recalcularLimitesDatas();
        }, 100);
    }
    
    changeStatusExameConvocacao() {
        this.statusAlteradoHomologado = true;
    }
    
    initializeTemplateObjects() {
        if ( this.atestado.getMotivoRecusa() == undefined ) 
            this.atestado.setMotivoRecusa(new MotivoRecusaAtestadoBuilder().initialize(this.atestado.getMotivoRecusa()));
        if ( this.atestado.getAgendamento() == undefined )
            this.atestado.setAgendamento(new TarefaBuilder().initialize(this.atestado.getAgendamento()));
        if (this.atestado.getCid() == undefined )
            this.atestado.setCid(new DiagnosticoBuilder().initialize(this.atestado.getCid()));
    }
    
    recalcularLimitesDatas() {
        this.atestadoService.recalcularLimitesDatas(new AtestadoBuilder().clone(this.atestado))
            .then(res => {
                this.atestado = new AtestadoBuilder().clone(res.json());
                this.initializeTemplateObjects();
            })
            .catch(error => {
                console.log("Erro ao recalcular o limite das datas.");
            })   
    }
    
    functionModalConfirmAuditar( evento ) {
        if ( evento )
            this.auditar();
    }
}