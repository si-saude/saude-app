import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/Rx';
import { MyDatePickerModule } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';
import * as $ from 'jquery';

import { GlobalVariable } from './../../../global';
import { Atendimento } from './../../../model/atendimento';
import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { Localizacao } from './../../../model/localizacao';
import { FilaAtendimentoOcupacional } from './../../../model/fila-atendimento-ocupacional';
import { FilaAtendimentoOcupacionalBuilder } from './../../fila-atendimento-ocupacional/fila-atendimento-ocupacional.builder';
import { LocalizacaoBuilder } from './../../localizacao/localizacao.builder';
import { AtendimentoBuilder } from './../atendimento.builder';
import { AtendimentoService } from './../atendimento.service';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { Triagem } from './../../../model/triagem';
import { TriagemBuilder } from './../../triagem/triagem.builder';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { Diagnostico } from './../../../model/diagnostico';
import { DiagnosticoBuilder } from './../../diagnostico/diagnostico.builder';
import { Eixo } from './../../../model/eixo';
import { EixoBuilder } from './../../eixo/eixo.builder';
import { Intervencao } from './../../../model/intervencao';
import { IntervencaoBuilder } from './../../intervencao/intervencao.builder';
import { ItemRespostaFichaColeta } from './../../../model/item-resposta-ficha-coleta';
import { ItemRespostaFichaColetaBuilder } from './../../item-resposta-ficha-coleta/item-resposta-ficha-coleta.builder';
import { ItemPerguntaFichaColeta } from './../../../model/item-pergunta-ficha-coleta';
import { IndicadorSast } from './../../../model/indicador-sast';
import { RespostaFichaColeta } from './../../../model/resposta-ficha-coleta';
import { IndicadorSastBuilder } from './../../indicador-sast/indicador-sast.builder';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../../risco-potencial/risco-potencial.builder';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { DateUtil } from '../../../generics/utils/date.util';
import { PlanejamentoUtil } from './../../../generics/utils/planejamento.util';
import { TriagemUtil } from './../../../generics/utils/triagem.util';
import { FichaColetaUtil } from './../../../generics/utils/ficha-coleta.util';

@Component( {
    selector: 'app-atendimento-form',
    templateUrl: './atendimento-form.html',
    styleUrls: ['./atendimento-form.css']
} )
export class AtendimentoFormComponent {
    private inscricao: Subscription;
    private atendimento: Atendimento;
    private atendimentos: Array<Atendimento>;
    private usuario: Usuario;
    private profissional: Profissional;
    private localizacoes: Array<Localizacao>;
    private localizacao: Localizacao;
    private filaAtendimentoOcupacionais: Array<FilaAtendimentoOcupacional>;
    private filaAtendimentoOcupacional: FilaAtendimentoOcupacional;
    private alive: boolean;
    private myDatePickerOptions: IMyDpOptions;
    private globalActions;
    private toastParams;
    private tabsActions;
    private modalConfirmLocalizacao;
    private audio: any;
    private disabledTab: string;
    private existAtendimento: boolean;

    private showPreload: boolean;
    private msgPreload: string;
    
    private dateUtil: DateUtil;
    private planejamentoUtil: PlanejamentoUtil;
    private triagemUtil: TriagemUtil;
    private fichaColetaUtil: FichaColetaUtil;
    private idEquipe: number;
    private timeout: Subscription;
    
    constructor( private route: ActivatedRoute, private router: Router,
        private atendimentoService: AtendimentoService ) {
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.localizacao = new LocalizacaoBuilder().initialize( this.localizacao );
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.atendimento = new AtendimentoBuilder().initialize( this.atendimento );
        this.atendimentos = new AtendimentoBuilder().initializeList( this.atendimentos );
        this.filaAtendimentoOcupacionais = new FilaAtendimentoOcupacionalBuilder().
            initializeList( this.filaAtendimentoOcupacionais );
        this.alive = true;
        this.myDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy'
        };
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.tabsActions = new EventEmitter<string | MaterializeAction>();
        this.modalConfirmLocalizacao = new EventEmitter<string | MaterializeAction>();
        this.audio = new Audio();
        this.disabledTab = 'disabled';
        this.existAtendimento = false;
        this.showPreload = true;
        this.msgPreload = "Atualizando...";
        this.dateUtil = new DateUtil();
        this.planejamentoUtil = new PlanejamentoUtil();
        this.triagemUtil = new TriagemUtil();
        this.fichaColetaUtil = new FichaColetaUtil();
    }

    ngOnInit() {
        this.audio.src = "./../../../../assets/audio/beep.mp3";

        $( document ).keypress( function( event ) {
            if ( event.charCode == 13 ) return false;
        } );

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
                                    this.idEquipe = this.profissional.getEquipe().getId();

                                    this.primeiraAtualizacao();
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
            console.log( "Usuario nao logada." );
            this.router.navigate( ["/login"] );
        }

        this.getLocalizacoes();
    }

    getLocalizacoes() {
        this.atendimentoService.getLocalizacoes()
            .then( res => {
                this.localizacoes = new LocalizacaoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( "Erro ao retornar as localizações." );
            } )
    }

    confirmarLocalizacao() {
        //verifico no openModalConfirmLocalizacao() se o id da localizacao eh maior que zero
        this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize( this.filaAtendimentoOcupacional );
        this.filaAtendimentoOcupacional.setProfissional( this.profissional );
        this.filaAtendimentoOcupacional.setLocalizacao( this.localizacao );
        this.atendimento.setFilaAtendimentoOcupacional( this.filaAtendimentoOcupacional );
        this.closeModalConfirmLocalizacao();
    }

    cancelarLocalizacao() {
        this.localizacao.setId( 0 );
        this.closeModalConfirmLocalizacao();
    }

    verifyLocalizacao() {
        if ( this.filaAtendimentoOcupacional != undefined && 
                this.filaAtendimentoOcupacional.getLocalizacao().getId() > 0 )
            return true;
        return false;
    }
    
    primeiraAtualizacao() {
        if ( this.profissional != undefined ) {
            this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize( this.filaAtendimentoOcupacional );
            this.filaAtendimentoOcupacional.setProfissional( this.profissional );
            this.atendimento.setFilaAtendimentoOcupacional( this.filaAtendimentoOcupacional );
            this.atendimentoService.atualizar( this.atendimento )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    if ( this.atendimento.getFilaAtendimentoOcupacional() != undefined ) {
                        this.localizacao = this.atendimento.getFilaAtendimentoOcupacional().getLocalizacao();
                        this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize( this.filaAtendimentoOcupacional );
                        this.filaAtendimentoOcupacional.setProfissional( this.profissional );
                        this.filaAtendimentoOcupacional.setLocalizacao( this.localizacao );
                        
                        this.atualizar();
                    } else {
                        this.filaAtendimentoOcupacional = undefined;
                    }
                    
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.filaAtendimentoOcupacional = undefined;
                    console.log( "Erro ao atualizar primeira vez: " + error.text() );
                    this.showPreload = false;
                } )
        } else {
            console.log( "Profissional nao setado." )
        }
    }

    atualizar() {
        console.log("atualizar");
        this.atualizarLista();
        if ( this.atendimento != undefined ) {
            this.showPreload = true;
            console.log(this.atendimento);
            this.atendimentoService.atualizar( this.atendimento )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    console.log("atendimento");
                    console.log(this.atendimento)
                    
                    if ( this.atendimento.getTriagens() != undefined )
                        this.atendimento.getTriagens().forEach(t => {
                            if ( t.getDiagnostico() == undefined )
                                t.setDiagnostico(new DiagnosticoBuilder().initialize(new Diagnostico()));
                            if ( t.getEquipeAbordagem() == undefined )
                                t.setEquipeAbordagem(new EquipeBuilder().initialize(new Equipe()));
                            if ( t.getIntervencao() == undefined )
                                t.setIntervencao(new IntervencaoBuilder().initialize(new Intervencao()));
                        })
                    
                    if( this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial()
                            .getEquipeResponsavel() == undefined )
                        this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().setEquipeResponsavel(new Equipe());
                    
                    if(this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial()
                            .getAbreviacaoEquipeAcolhimento() == this.profissional.getEquipe().getAbreviacao() )
                        this.disabledTab = '';
                    else this.disabledTab = 'disabled';
                    
                    if ( this.atendimento.getId() > 0 ) {
                        this.localizacao = this.atendimento.getFilaAtendimentoOcupacional().getLocalizacao();
                        
                        if ( this.atendimento.getFilaAtendimentoOcupacional().getStatus().includes("DISPON") )
                            this.alive = true;
                        else this.alive = false;
                        
                        this.existAtendimento = true;

                        for ( let i = 0; i < $( ".tab" ).children().length; i++ ) {
                            if ( $( ".tab" ).children()[0].className == "active" )
                                this.tabsActions.emit( { action: "tabs", params: ['select_tab', 'atendimento'] } );
                        }
                        
                        if ( this.atendimento.getFilaAtendimentoOcupacional().getStatus().length == 20 ) {
                            this.audio.load();
                            this.audio.play();
                        }
                    }
                    if ( this.atendimento.getFilaAtendimentoOcupacional().getId() == 0 || 
                            ( this.atendimento.getFilaAtendimentoOcupacional().getStatus().includes("DISPON") && 
                            !this.atendimento.getFilaAtendimentoOcupacional().getStatus().includes("IN") ) ) {
                        this.timeout = Observable.timer(33000).subscribe(() => this.atualizar()); 
                    }
                    
                    this.showPreload = false;
                } )
                .catch( error => {
                    this.showPreload = false;
                    this.catchConfiguration( error );
                    this.atendimento = new AtendimentoBuilder().initialize( new Atendimento() );
                    console.log( "Erro ao atualizar: " + error );
                } )
        } else {
            this.primeiraAtualizacao();
            console.log( "Fila de atendimento nao preenchida." );
        }
    }

    atualizarLista() {
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.atendimentoService.atualizarLista( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    console.log( "Erro ao atualizar lista: " + error );
                } )
        } else {
            console.log( "Fila de atendimento nao preenchida." )
        }
    }

    entrar() {
        if ( this.localizacao == undefined || this.localizacao.getId() <= 0 ) {
            this.toastParams = ["Por favor, seleciona um local", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.atendimentoService.entrar( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.toastParams = ["Profissional inserido na fila de atendimento", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                    this.atualizar();
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        } else {
            console.log( "Fila de atendimento nao preenchida." );
        }
    }

    pausar() {
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.atendimentoService.pausar( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.toastParams = ["Fila de atendimento pausada", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                    this.atualizar();
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        } else {
            console.log( "Fila de atendimento nao preenchida." )
        }
    }

    almoco() {
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.atendimentoService.almoco( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.toastParams = ["Fila de atendimento pausada", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                    this.atualizar();
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        } else {
            console.log( "Fila de atendimento nao preenchida." )
        }
    }

    encerrar() {
        this.localizacao.setId(0);
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.filaAtendimentoOcupacional.getLocalizacao().setId(0);
            this.atendimentoService.encerrar( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().clone(new FilaAtendimentoOcupacional());
                    this.toastParams = ["Fila de atendimento encerrada", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                    this.atualizar();
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        } else {
            console.log( "Fila de atendimento nao preenchida." )
        }
    }

    voltar() {
        if ( this.filaAtendimentoOcupacional != undefined ) {
            let filaAtendimentoOcupacional: FilaAtendimentoOcupacional = new FilaAtendimentoOcupacional();
            filaAtendimentoOcupacional.setProfissional( this.profissional );
            filaAtendimentoOcupacional.setLocalizacao( this.localizacao );
            this.atendimentoService.voltar( filaAtendimentoOcupacional )
                .then( res => {
                    this.toastParams = ["Profissional retornou para a fila de atendimento", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                    this.atualizar();
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        } else {
            console.log( "Fila de atendimento nao preenchida." )
        }
    }

    iniciar() {
        if ( this.atendimento.getId() > 0 ) {
            this.atendimentoService.iniciar( new AtendimentoBuilder().clone(this.atendimento) )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    this.toastParams = ["Atendimento iniciado.", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atualizar();
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }

    registrarAusencia() {
        if ( this.atendimento.getId() > 0 ) {
            this.atendimentoService.registrarAusencia( new AtendimentoBuilder().clone(this.atendimento) )
                .then( res => {
                    this.toastParams = ["Ausencia registrada", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    this.atualizar();
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }

    liberar() {
        if ( this.atendimento.getId() > 0 ) {

            if ( !this.fichaColetaUtil.verifyValidFichaColeta(
                    this.atendimento.getFilaEsperaOcupacional().getFichaColeta(), this.profissional.getEquipe().getId()) ) {
                this.toastParams = ["Por favor, preencha os campos da Ficha de Coleta exigidos", 4000];
                this.globalActions.emit( 'toast' );
                return;
            }

            this.atendimentoService.liberar( new AtendimentoBuilder().clone(this.atendimento) )
                .then( res => {
                    this.toastParams = ["Empregado liberado", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    this.atualizar();
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }

    finalizar() {
        if ( this.atendimento.getId() > 0 ) {

            if ( !this.fichaColetaUtil.verifyValidFichaColeta(
                    this.atendimento.getFilaEsperaOcupacional().getFichaColeta(), this.profissional.getEquipe().getId()) ) {
                this.toastParams = ["Por favor, preencha os campos da Ficha de Coleta exigidos", 4000];
                this.globalActions.emit( 'toast' );
                return;
            }

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
            
            this.atendimentoService.finalizar( new AtendimentoBuilder().clone(this.atendimento) )
                .then( res => {
                    this.toastParams = ["Atendimento finalizado", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    this.atualizar();
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }

    devolverPraFila() {
        if ( this.atendimento.getId() > 0 ) {
            this.atendimentoService.devolverPraFila( new AtendimentoBuilder().clone(this.atendimento) )
                .then( res => {
                    this.toastParams = ["Empregado devolvido pra fila", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    this.atualizar();
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }

    finalizarPausar() {
        if ( this.atendimento.getId() > 0 ) {

            if ( !this.fichaColetaUtil.verifyValidFichaColeta(
                    this.atendimento.getFilaEsperaOcupacional().getFichaColeta(), this.profissional.getEquipe().getId()) ) {
                this.toastParams = ["Por favor, preencha os campos da Ficha de Coleta exigidos", 4000];
                this.globalActions.emit( 'toast' );
                return;
            }

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

            this.atendimentoService.finalizarPausar( new AtendimentoBuilder().clone(this.atendimento) )
                .then( res => {
                    this.toastParams = ["Atendimento finalizado", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    this.atualizar();
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }

    openModalConfirmLocalizacao() {
        if ( this.localizacao.getId() > 0 ) {
            this.modalConfirmLocalizacao.emit( { action: "modal", params: ['open'] } );
        } else {
            this.toastParams = ["Por favor, selecione um local.", 4000];
            this.globalActions.emit( 'toast' );
            this.closeModalConfirmLocalizacao();
        }
    }

    closeModalConfirmLocalizacao() {
        this.modalConfirmLocalizacao.emit( { action: "modal", params: ['close'] } );
    }

    catchConfiguration( error ) {
        switch ( error.status ) {
            case 401:
                localStorage.clear();
                this.router.navigate( ["login"] );
                break;
        }
    }

    selectAcolhimentoTab() {
        setTimeout(() => {
            if ( this.profissional.getEquipe().getAbreviacao() == "ACO" ) return '';
            else return 'disabled';
        }, 500 );
    }

    isAcolhimento() {
        if ( this.profissional.getEquipe().getAbreviacao() == 
            this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().getAbreviacaoEquipeAcolhimento())
            return true
        else return false;
    }
    
    ngOnDestroy() {
        this.alive = false;
        if ( this.inscricao != undefined )
            this.inscricao.unsubscribe();
        if ( this.timeout != undefined )
            this.timeout.unsubscribe();
    }
    
}