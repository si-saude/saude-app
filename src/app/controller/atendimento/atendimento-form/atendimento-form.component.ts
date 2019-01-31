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
import { Aso } from './../../../model/aso';
import { Recordatorio } from './../../../model/recordatorio';
import { RecordatorioBuilder } from './../../recordatorio/recordatorio.builder';
import { AtendimentoFilter } from './../../atendimento/atendimento.filter';
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
import { RecordatorioFilter } from './../../recordatorio/recordatorio.filter';
import { DateUtil } from '../../../generics/utils/date.util';
import { PlanejamentoUtil } from './../../../generics/utils/planejamento.util';
import { TriagemUtil } from './../../../generics/utils/triagem.util';
import { FichaColetaUtil } from './../../../generics/utils/ficha-coleta.util';
import { Util } from './../../../generics/utils/util';
import { MenuAtendimentoNutricaoComponent } from './../../../includes/menu-atendimento-nutricao/menu-atendimento-nutricao.component';

@Component( {
    selector: 'app-atendimento-form',
    templateUrl: './atendimento-form.html',
    styleUrls: ['./atendimento-form.css']
} )
export class AtendimentoFormComponent {
    @ViewChild( MenuAtendimentoNutricaoComponent ) menuNutricao: MenuAtendimentoNutricaoComponent;
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
    
    private nivelAtividadeFisica: string;
    
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
        this.atualizarLista();
        if ( this.atendimento != undefined ) {
            this.showPreload = true;
            this.atualizacao( this.atendimento )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    if ( this.profissional.getEquipe().getAbreviacao() == 'NUT' ) {
                            this.tratamentoNutricao();
                    }
                    
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
                    } else {
                        if ( this.timeout != undefined )
                            this.timeout.unsubscribe();
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
    
    atualizacao(atendimento) {
        return this.atendimentoService.atualizar( new AtendimentoBuilder().clone(atendimento) );
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
            this.atendimento.getFilaAtendimentoOcupacional().setStatus('');
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
            
            if ( !this.verifyAso(this.atendimento.getAso())) {
                this.toastParams = ["Por favor, preencha os campos do Aso exigidos", 4000];
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
            if ( !this.verifyAso(this.atendimento.getAso())) {
                this.toastParams = ["Por favor, preencha os campos do Aso exigidos", 4000];
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
    
    verifyAso(aso : Aso){     
        let ret: boolean = true;
    
        if(aso && this.atendimento.getTarefa().getEquipe().getAbreviacao() == 'MED' && this.atendimento.getAso().getPendente() == false &&
                this.atendimento.getAso().getAptidoes().find(x => x.getAptidaoAso() !='APTO')){
                   
                this.atendimento.getAso().getAptidoes().forEach(x=>{
                    if(x.getAptidaoAso() !='APTO' && (!Util.isNotNull(this.atendimento.getAso().getDataRestricao())) || (!Util.isNotNull(x.getAptidaoAso())) ){
                        ret = false;
                    }
                }); 
                
            if( this.atendimento.getAso().getAusenciaExames() == false && this.atendimento.getAso().getExamesConvocacao().length == 0)
                ret =  false;
        }
        return ret;
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
            
            if ( !this.verifyAso(this.atendimento.getAso())) {
                this.toastParams = ["Por favor, preencha os campos do Aso exigidos", 4000];
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
    
    clickBtnNovoQuestionario(click: boolean) {
        if ( this.atendimento != undefined ) {
            this.showPreload = true;
            this.atualizacao(this.atendimento)
                .then(res => {
                    this.showPreload = false;
                    this.atendimento = new AtendimentoBuilder().clone(res.json());
                    this.atendimento.getTriagens().forEach(t => {
                        if ( t.getDiagnostico() == undefined )
                            t.setDiagnostico(new DiagnosticoBuilder().initialize(null));
                        if ( t.getIntervencao() == undefined )
                            t.setIntervencao(new IntervencaoBuilder().initialize(null));
                        if ( t.getEquipeAbordagem() == undefined )
                            t.setEquipeAbordagem(new EquipeBuilder().initialize(null));
                    })
                    
                    
                    this.menuNutricao.callBtnNewQuestionario();
                })
                .catch(error => {
                    this.catchConfiguration(error);
                })
        }
    }
    
    clickBtnNovoRecordatorio(click: boolean) {
        if ( this.atendimento != undefined ) {
            this.showPreload = true;
            this.atualizacao(this.atendimento)
                .then(res => {
                    this.showPreload = false;
                    this.atendimento = new AtendimentoBuilder().clone(res.json());
                    this.atendimento.getTriagens().forEach(t => {
                        if ( t.getDiagnostico() == undefined )
                            t.setDiagnostico(new DiagnosticoBuilder().initialize(null));
                        if ( t.getIntervencao() == undefined )
                            t.setIntervencao(new IntervencaoBuilder().initialize(null));
                        if ( t.getEquipeAbordagem() == undefined )
                            t.setEquipeAbordagem(new EquipeBuilder().initialize(null));
                    })
         			 this.menuNutricao.callBtnNewRecordatorio();
                })
                .catch(error => {
                    this.catchConfiguration(error);
                })
        }
    }
    
    clickBtnNovoPlanoAlimentar(click: boolean) {
        if ( this.atendimento != undefined ) {
            this.showPreload = true;
            this.atualizacao(this.atendimento)
                .then(res => {
                    this.showPreload = false;
                    this.atendimento = new AtendimentoBuilder().clone(res.json());
                    this.atendimento.getTriagens().forEach(t => {
                        if ( t.getDiagnostico() == undefined )
                            t.setDiagnostico(new DiagnosticoBuilder().initialize(null));
                        if ( t.getIntervencao() == undefined )
                            t.setIntervencao(new IntervencaoBuilder().initialize(null));
                        if ( t.getEquipeAbordagem() == undefined )
                            t.setEquipeAbordagem(new EquipeBuilder().initialize(null));
                    })                 
                        this.menuNutricao.callBtnNewPlanoAlimentar();
                })
                .catch(error => {
                    this.catchConfiguration(error);
                })
        }
    }
    
    tratamentoNutricao(){
        if ( this.atendimento.getQuestionario() != undefined &&
                this.atendimento.getQuestionario().getId() > 0 ) {
            this.calcularPontuacaoQuestionario();
        }
        
       let triagemImc = this.atendimento.getTriagens().find(t => t.getIndicadorSast().getCodigo() == "N08" );
       
       if(triagemImc.getIndice() == -1){
           let imc = this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().find(x=>x.getPergunta().getGrupo().includes("EXAME F") && x.getPergunta().getCodigo()=="0003").getConteudo()
           triagemImc.setIndice(this.definirIndiceTriagemImc(imc));
       }
       
       let recordatorio: Recordatorio = new RecordatorioBuilder().initialize(new Recordatorio());
       let recordatorioFilter : RecordatorioFilter = new RecordatorioFilter(); 
       recordatorioFilter.setAtendimento(new AtendimentoFilter);
       recordatorioFilter.getAtendimento().setId(this.atendimento.getId());
       
       
           this.atendimentoService.getRecordatorioService().verifyRecordatorio(recordatorioFilter).then(res =>{
               recordatorio =  new RecordatorioBuilder().clone(res.json());                
               
               if(recordatorio.getId() > 0){                   
//                   let triagemBE = this.atendimento.getTriagens().find(t => t.getIndicadorSast().getCodigo() == "N01" );
                   let triagemSodio = this.atendimento.getTriagens().find(t => t.getIndicadorSast().getCodigo() == "N04" );
                   let triagemFibra = this.atendimento.getTriagens().find(t => t.getIndicadorSast().getCodigo() == "N05" );
                   
//                   if(triagemBE.getIndice() == -1)
//                       triagemBE.setIndice(this.definirIndiceTriagemBE(recordatorio));                  

                   if(triagemSodio.getIndice() == -1)
                       triagemSodio.setIndice(this.definirIndiceTriagemSodio(recordatorio));
                   
                   if(triagemFibra.getIndice() == -1)
                       triagemFibra.setIndice(this.definirIndiceTriagemFibra(recordatorio));
               }               
           });         
    }
    
    
    
    loadNutricao( bool ) {
        if(bool)
            this.atualizar();
    }
    
    calcularPontuacaoQuestionario() {
        if ( this.atendimento.getTriagens().find(t => t.getIndicadorSast().getCodigo() == "N07" ).getIndice() != -1 )
            return;
    
        let soma: number = 0;
        if ( this.atendimento.getQuestionario() != undefined && this.atendimento.getQuestionario().getId() > 0 ) {
            this.atendimento.getQuestionario().getRespostas().forEach(r => {
                if ( r.getItem().getId() == 
                    r.getIndicador().getItemIndicadorConhecimentoAlimentares().find(rii => rii.getCerto() == true).getId() )
                    soma++;
            })
        }
        
        this.atendimento.getTriagens().find(t => t.getIndicadorSast().getCodigo() == "N07" )
            .setIndice(this.definirIndiceTriagemQuestionario(soma));
    }
    
    
    //FALTA
    definirIndiceTriagemBE(recordatorio :Recordatorio) {   
        let somaVE = 0;
        recordatorio.getRefeicoes().forEach(x=>{
            x.getItens().forEach(i=> {
                somaVE +=i.getVe();
                        });
        }); 
        let indice: number = 0;
        
        return indice;
    }
    
    definirIndiceTriagemImc(imc) {
       let imcAux =  Util.treatDouble(imc);
       
        let indice: number = 0;
        if ( imcAux >= 40 || imcAux <= 16)
            indice = 0;
        else if ((imcAux >= 30 && imcAux <= 39.9) || (imcAux > 16 && imcAux <= 17))
            indice = 1;
        else if ( (imcAux >= 25 && imcAux <= 29.9) || (imcAux > 17  && imcAux <= 18.5) )
            indice = 2;
        else if ( imcAux > 18.5 && imcAux < 24.9)
            indice = 3;
        
        return indice;
    }
 
    
    definirIndiceTriagemQuestionario(soma) {
        let indice: number = 0;
        if ( soma <= 2)
            indice = 0;
        else if ( soma >= 3 && soma <= 4 )
            indice = 1;
        else if ( soma >= 5 && soma <= 6 )
            indice = 2;
        else if ( soma >= 7 && soma <= 8 )
            indice = 3;
        else if ( soma >= 9 && soma <= 10 )
            indice = 4;
        return indice;
    }
    
    definirIndiceTriagemSodio(recordatorio: Recordatorio){
        let indice: number = 0;
        let somaSodio = 0;
        recordatorio.getRefeicoes().forEach(x=>{
            x.getItens().forEach(i=> {
                if(i.getAlimento().getSodio() != undefined)
                    somaSodio += Util.treatDouble(i.getAlimento().getSodio()) * Util.treatDouble(i.getQuantidade());
            });
        }); 
        
        if ( somaSodio > 5)
            indice = 0;
        else if ( somaSodio > 3.5)
            indice = 1;
        else if ( somaSodio > 2)
            indice = 2;
        else if ( somaSodio <= 2)
            indice = 3; 
        
        return indice;
    }
    
    definirIndiceTriagemFibra(recordatorio: Recordatorio){
        let indice: number = 0;
        let somaFibra = 0;
        recordatorio.getRefeicoes().forEach(x=>{
            x.getItens().forEach(i=> {
                if(i.getAlimento().getFibra() != undefined)
                    somaFibra += Util.treatDouble(i.getAlimento().getFibra()) * Util.treatDouble(i.getQuantidade());                   
            });
        }); 
        
        if ( somaFibra < 22)
            indice = 0;
        else if ( somaFibra < 23.5)
            indice = 1;
        else if ( somaFibra < 25)
            indice = 2;
        else if ( somaFibra >= 25)
            indice = 3; 
        
        return indice;
    }
    
    setNivelAtividadeFisica(evento: string) {
        let indice = this.definirIndiceTriagemNivelAtividadeFisica(evento);
        this.atendimento.getTriagens()[0].setIndice(indice);
        this.triagemUtil.selectTriagem(0, indice);
        //input para ficha coleta
        this.nivelAtividadeFisica = evento;
    }
    
    definirIndiceTriagemNivelAtividadeFisica(valor: string) {
        if ( valor == "IRREGULAR ATIVO A")
            return 2;
        else if ( valor == "IRREGULAR ATIVO B")
            return 1;
        else if ( valor == "REGULARMENTE ATIVO")
            return 3;
        else if ( valor == "MUITO ATIVO")
            return 4;
        else return 0; 
    }
    
    ngOnDestroy() {
        this.alive = false;
        if ( this.inscricao != undefined )
            this.inscricao.unsubscribe();
        if ( this.timeout != undefined )
            this.timeout.unsubscribe();
    }
}