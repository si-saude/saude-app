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
    private nomeProfissional: String;
    private statusProfissional: String;
    private localizacoes: Array<Localizacao>;
    private localizacao: Localizacao;
    //contem os indices já clicados, key = index da triagem, value = numero do indice
    private triagemIndices: Map<number, number>;
    private existLocalizacao: boolean;
    private filaAtendimentoOcupacionais: Array<FilaAtendimentoOcupacional>;
    private filaAtendimentoOcupacional: FilaAtendimentoOcupacional;
    private alive: boolean;
    private dataNascimento: any;
    private inicioAgendamento: any;
    private fimAgendamento: any;
    private idade: number;
    private myDatePickerOptions: IMyDpOptions;
    private globalActions;
    private toastParams;
    private tabsActions;
    private modalConfirmLocalizacao;
    private audio: any;
    private prazos: Array<string>;
    private equipes: Array<Equipe>;
    private equipesSelecteds: Array<Equipe>;
    private disabledTab: string;
    private existAtendimento: boolean;

    private statusesSimNao: Array<string>;

    private diagnosticos: Array<Diagnostico>;
    private validDiagnostico: string;
    private autocompleteDiagnostico;

    private intervencoes: Array<Intervencao>;
    private validIntervencao: string;
    private autocompleteIntervencao;

    private equipeAbordagens: Array<Equipe>;
    private validEquipeAbordagem: string;
    private autocompleteEquipeAbordagem;

    private equipesTriagensTodosAtendimentos: Array<Equipe>;
    private triagensTodosAtendimentosByEquipe = [[]];

    private gruposRespostasFichaColeta: Array<string>;
    private respostasFichaColetaByGrupo = [[]];
    private quantidadeItemRespostasByGrupo: Array<number>;

    private showPreload: boolean;
    private msgPreload: string;
    
    private listPathsEnumPergunta: Array<string>;
    private listEnumsByPathPergunta = [[]];
    private listPathsEnumItem: Array<string>;
    private listEnumsByPathItem = [[]];
    
    private flagIdTriagem: number;
    private modalDiagnostico;
    private filterDiagnostico: string;
    private arrayDiagnostico: Array<Diagnostico>;
    private modalIntervencao;
    private filterIntervencao: string;
    private arrayIntervencao: Array<Intervencao>;
    private modalEquipe;
    private filterEquipe: string;
    private arrayEquipe: Array<Equipe>;
    private eixos: Array<Eixo>;
    private selectEixoId: string;
    private filter;
    private typeFilter;
    private value;
    private activeDiagnostico:boolean;
    private activeIntervencao:boolean;
    
    private t = 0;
    
    constructor( private route: ActivatedRoute, private router: Router,
        private atendimentoService: AtendimentoService ) {
        this.nomeProfissional = "";
        this.statusProfissional = "";
        this.localizacao = new LocalizacaoBuilder().initialize( this.localizacao );
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.atendimento = new AtendimentoBuilder().initialize( this.atendimento );
        this.atendimentos = new AtendimentoBuilder().initializeList( this.atendimentos );
        this.triagemIndices = new Map<number, number>();
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
        this.existLocalizacao = false;
        this.audio = new Audio();
        this.validDiagnostico = "";
        this.diagnosticos = new Array<Diagnostico>();
        this.validIntervencao = "";
        this.intervencoes = new Array<Intervencao>();
        this.prazos = new Array<string>();
        this.equipes = new Array<Equipe>();
        this.equipesSelecteds = new Array<Equipe>();
        this.equipesTriagensTodosAtendimentos = new Array<Equipe>();
        this.gruposRespostasFichaColeta = new Array<string>();
        this.disabledTab = 'disabled';
        this.existAtendimento = false;
        this.quantidadeItemRespostasByGrupo = new Array<number>();
        this.equipeAbordagens = new EquipeBuilder().initializeList(new Array<Equipe>());
        this.showPreload = true;
        this.msgPreload = "Atualizando...";
        this.listPathsEnumItem = new Array<string>();
        this.listPathsEnumPergunta = new Array<string>();
        
        this.modalDiagnostico = new EventEmitter<string | MaterializeAction>();
        this.filterDiagnostico = "";
        this.arrayDiagnostico = new Array<Diagnostico>();
        this.modalIntervencao = new EventEmitter<string | MaterializeAction>();
        this.filterIntervencao = "";
        this.arrayIntervencao = new Array<Intervencao>();
        this.modalEquipe = new EventEmitter<string | MaterializeAction>();
        this.filterEquipe = "";
        this.arrayEquipe = new Array<Equipe>();
        this.eixos = new Array<Eixo>();
        this.selectEixoId = "";
        this.filter = "";
        this.activeDiagnostico = false;
        this.activeIntervencao = false;
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
                                    this.nomeProfissional = this.profissional.getEmpregado().getPessoa().getNome();

                                    this.primeiraAtualizacao();

                                    this.inscricao = TimerObservable.create( 0, 33000 )
                                        .takeWhile(() => this.alive )
                                        .subscribe(() => {
                                            this.atualizar();
                                            this.atualizarLista();
                                        } );
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
        this.getStatusSimNao();
        this.getPrazos();
        this.getEquipes();
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

    getStatusSimNao() {
        this.atendimentoService.getStatusSimNao()
            .then( res => {
                this.statusesSimNao = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( "Erro ao retornar os status." );
            } )
    }

    getPrazos() {
        this.atendimentoService.getPrazos()
            .then( res => {
                this.prazos = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( "Erro ao retornar os prazos." );
            } )
    }

    getEquipes() {
        this.atendimentoService.getEquipes()
            .then( res => {
                this.equipes = new EquipeBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( "Erro ao retornar os prazos." );
            } )
    }

    confirmarLocalizacao() {
        //verifico no openModalConfirmLocalizacao() se o id da localizacao eh maior que zero
        this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize( this.filaAtendimentoOcupacional );
        this.filaAtendimentoOcupacional.setProfissional( this.profissional );
        this.filaAtendimentoOcupacional.setLocalizacao( this.localizacao );
        this.atendimento.setFilaAtendimentoOcupacional( this.filaAtendimentoOcupacional );
        this.existLocalizacao = true;
        this.closeModalConfirmLocalizacao();
    }

    cancelarLocalizacao() {
        this.existLocalizacao = false;
        this.localizacao.setId( 0 );
        this.closeModalConfirmLocalizacao();
    }

    primeiraAtualizacao() {
        if ( this.profissional != undefined ) {
            this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize( this.filaAtendimentoOcupacional );
            this.filaAtendimentoOcupacional.setProfissional( this.profissional );
            this.atendimento.setFilaAtendimentoOcupacional( this.filaAtendimentoOcupacional );
            this.atendimentoService.atualizar( this.atendimento )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    
                    this.statusProfissional = this.atendimento.getFilaAtendimentoOcupacional().getStatus();
                    if ( this.atendimento.getFilaAtendimentoOcupacional() != undefined ) {
                        this.localizacao = this.atendimento.getFilaAtendimentoOcupacional().getLocalizacao();
                        this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize( this.filaAtendimentoOcupacional );
                        this.filaAtendimentoOcupacional.setProfissional( this.profissional );
                        this.filaAtendimentoOcupacional.setLocalizacao( this.localizacao );
                        this.existLocalizacao = true;
                    } else {
                        this.filaAtendimentoOcupacional = undefined;
                    }
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.filaAtendimentoOcupacional = undefined;
                    console.log( "Erro ao atualizar primeira vez: " + error );
                } )
        } else {
            console.log( "Profissional nao setado." )
        }
    }

    atualizar() {
        if ( this.atendimento != undefined ) {
            this.showPreload = true;
            this.setDatas();
            this.atendimentoService.atualizar( this.atendimento )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    
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
                    
                    setTimeout(() => {
                        this.triagemIndices = new Map<number, number>();
                        
                        for ( let idx = 0; idx < this.atendimento.getTriagens().length; idx++ ) {
                            this.triagemIndices.set( idx, this.atendimento.getTriagens()[idx].getIndice() );
                            if ( this.atendimento.getTriagens()[idx].getIndice() != -1 ) {
                                let i: string = "indice" + this.triagemIndices.get( idx ) + "_" + idx;
                                $( "td[title=" + i + "]" ).css( "background", "#D4D4D4" );
                            }
                        }
                    }, 200 );
                    
                    this.atendimento.getTriagens().sort(function(a, b) {
                        if ( a.getIndicadorSast().getCodigo() < b.getIndicadorSast().getCodigo() )
                            return -1;
                        if ( a.getIndicadorSast().getCodigo() > b.getIndicadorSast().getCodigo() )
                            return 1;
                        return 0;
                    })

                    this.getTriagensTodosAtendimentos();
                    this.getRespostasFichaColeta();

                    this.statusProfissional = this.atendimento.getFilaAtendimentoOcupacional().getStatus();

                    if ( this.atendimento.getId() > 0 ) {
                        this.equipesSelecteds = this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().getEquipes();
                        
                        this.localizacao = this.atendimento.getFilaAtendimentoOcupacional().getLocalizacao();
                        this.existLocalizacao = true;
                        this.existAtendimento = true;
                        this.getDatas();

                        for ( let i = 0; i < $( ".tab" ).children().length; i++ ) {
                            if ( $( ".tab" ).children()[0].className == "active" )
                                this.tabsActions.emit( { action: "tabs", params: ['select_tab', 'atendimento'] } );
                        }

                        if ( this.atendimento.getFilaAtendimentoOcupacional().getStatus().length == 20 ) {
                            this.audio.load();
                            this.audio.play();
                        }
                    }
                    this.showPreload = false;
                } )
                .catch( error => {
                    this.showPreload = false;
                    this.catchConfiguration( error );
                    console.log( "Erro ao atualizar: " + error );
                    this.atendimento = new AtendimentoBuilder().initialize( new Atendimento() );
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

    selectTriagem( indexTriagem, indice ) {
        let i: string = "indice" + indice + "_" + indexTriagem.toString();

        if ( this.triagemIndices.get( indexTriagem ) != undefined ) {
            if ( this.triagemIndices.get( indexTriagem ) == Number( indice ) ) {
                $( "td[title=" + i + "]" ).css( "background", "" );
                this.atendimento.getTriagens()[indexTriagem].setIndice( -1 );
                this.triagemIndices.delete( indexTriagem );
                return;
            }
            let iAntigo: string = "indice" + this.triagemIndices.get( indexTriagem ) + "_" + indexTriagem.toString();
            $( "td[title=" + iAntigo + "]" ).css( "background", "" );
        }

        $( "td[title=" + i + "]" ).css( "background", "#D4D4D4" );
        
        this.triagemIndices.set( indexTriagem, Number( indice ) );

        this.atendimento.getTriagens()[indexTriagem].setIndice( Number( indice ) );
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
        if ( this.filaAtendimentoOcupacional != undefined ) {
            let filaAtendimentoOcupacional: FilaAtendimentoOcupacional = new FilaAtendimentoOcupacional();
            filaAtendimentoOcupacional.setProfissional( this.profissional );
            filaAtendimentoOcupacional.setLocalizacao( this.localizacao );
            this.atendimentoService.encerrar( filaAtendimentoOcupacional )
                .then( res => {
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
                    this.getTriagensTodosAtendimentos();
                    this.getRespostasFichaColeta();
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

            if ( !this.verifyValidFichaColeta() ) {
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

            if ( !this.verifyValidFichaColeta() ) {
                this.toastParams = ["Por favor, preencha os campos da Ficha de Coleta exigidos", 4000];
                this.globalActions.emit( 'toast' );
                return;
            }

            if ( !this.verifyValidTriagens() ) {
                this.toastParams = ["Por favor, preencha os campos de Triagem exigidos", 4000];
                this.globalActions.emit( 'toast' );
                return;
            }

            if ( !this.verifyPlanejamento() ) {
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
                    this.getTriagensTodosAtendimentos();
                    this.getRespostasFichaColeta();
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

            if ( !this.verifyValidFichaColeta() ) {
                this.toastParams = ["Por favor, preencha os campos da Ficha de Coleta exigidos", 4000];
                this.globalActions.emit( 'toast' );
                return;
            }

            if ( !this.verifyValidTriagens() ) {
                this.toastParams = ["Por favor, preencha os campos de Triagem exigidos", 4000];
                this.globalActions.emit( 'toast' );
                return;
            }

            if ( !this.verifyPlanejamento() ) {
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

    verifyValidFichaColeta() {
        let respostas: Array<RespostaFichaColeta> = new Array<RespostaFichaColeta>();
        let ret: boolean = true;
        let resp: RespostaFichaColeta = this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()
            .find( r => r.getPergunta().getGrupo() == 'ANAMNESE' && r.getPergunta().getCodigo() == '0008' &&
                        r.getConteudo() != 'SIM');
        
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().forEach(rFC => {
            if ( rFC.getPergunta().getEquipes().find(e => e.getId() == this.profissional.getEquipe().getId() ) != undefined &&
                    ((rFC.getPergunta().getGrupo().includes( "TESTE DE FAGERSTR" ) && resp == undefined) || 
                            !rFC.getPergunta().getGrupo().includes( "TESTE DE FAGERSTR" )) )
                respostas.push(rFC);
        })
        
        respostas.forEach( r => {
            if ( r.getConteudo() == "" ) ret = false;
        } )
        
        return ret;
    }

    verifyValidTriagens() {
        let triagem = this.atendimento.getTriagens().find( t => {
            if ( t.getIndicadorSast().getObrigatorio() == true && t.getIndice() == -1 )
                return true;
            else return false;
        } );

        if ( triagem != undefined ) return false;
        else return true;
    }

    verifyPlanejamento() {
        let ret: boolean = true;
        let triagens: Array<Triagem> = new Array<Triagem>();
        let triagensInvalidas: Array<Triagem> = new Array<Triagem>();

        if ( this.atendimento.getTriagens().length == 0 ) return true;

        triagens = this.atendimento.getTriagens().filter( t => {
            if ( t.getIndice() > -1 ) {
                if ( t.getDiagnostico().getDescricao() == "" || t.getDiagnostico().getDescricao() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getIntervencao().getDescricao() == "" || t.getIntervencao().getDescricao() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getEquipeAbordagem().getNome() == "" || t.getEquipeAbordagem().getNome() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getPrazo() == "" || t.getPrazo() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                }
            }

            return true;
        } )

        if ( triagens.length > 0 ){
            triagensInvalidas.forEach( t => {
                if (t.getIndice() < 3 && (t.getJustificativa() == "" || t.getJustificativa() == undefined) )
                    ret = false;
            } );
            
            if( triagens.find(t => t.getEquipeAbordagem().getId() == this.profissional.getEquipe().getId())
                    == undefined)
                ret = false;
        }
        else ret = false;

        return ret;
    }

    verifyEquipe( resposta: RespostaFichaColeta ) {
        let resp: RespostaFichaColeta = this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()
            .find( r => r.getPergunta().getGrupo() == 'ANAMNESE' && r.getPergunta().getCodigo() == '0008' &&
                        r.getConteudo() == 'SIM');
        
        let e: Equipe = resposta.getPergunta().getEquipes()
            .find( e => e.getId() == this.profissional.getEquipe().getId() );
    
        if(resposta.getPergunta().getGrupo().includes( "TESTE DE FAGERSTR" )){
            if(e != undefined && resp != undefined) return false;
        }else{
            if(e != undefined) return false;
        }

        return true;
    }

    openModalConfirmLocalizacao() {
        if ( this.localizacao.getId() > 0 ) {
            this.modalConfirmLocalizacao.emit( { action: "modal", params: ['open'] } );
        } else {
            this.toastParams = ["Por favor, selecione um local.", 4000];
            this.globalActions.emit( 'toast' );
            this.existLocalizacao = false;
            this.closeModalConfirmLocalizacao();
        }
    }

    closeModalConfirmLocalizacao() {
        this.modalConfirmLocalizacao.emit( { action: "modal", params: ['close'] } );
    }

    ngOnDestroy() {
        this.alive = false;
        if ( this.inscricao != undefined )
            this.inscricao.unsubscribe();
    }

    getDatas() {
        if ( this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getDataNascimento() != undefined ) {
            this.dataNascimento = this.parseDataToObjectDatePicker( this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getDataNascimento() );
        }
        
        if ( this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().getInicioAgendamento() != undefined ) {
            this.inicioAgendamento = this.parseDataToObjectDatePicker( this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().getInicioAgendamento() );
        }else{
            this.inicioAgendamento = null;
        }
        
        if ( this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().getFimAgendamento() != undefined ) {
            this.fimAgendamento = this.parseDataToObjectDatePicker( this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().getFimAgendamento() );
        }else{
            this.fimAgendamento = null;
        }
    }
    
    setDatas(){
        if ( this.inicioAgendamento != undefined && this.inicioAgendamento != null) {
            this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().setInicioAgendamento(
                    this.parseDatePickerToDate(this.inicioAgendamento));
        }else
            this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().setInicioAgendamento(undefined);
        
        if ( this.fimAgendamento != undefined && this.fimAgendamento != null ) {
            this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().setFimAgendamento(
                    this.parseDatePickerToDate(this.fimAgendamento));
        }else
            this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().setFimAgendamento(undefined);
    }

    parseDataToObjectDatePicker( data ) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.split( "T" );
        let datas = s[0].split( "-" );
        if ( datas[2].substring( 0, 1 ) === "0" ) {
            datas[2] = datas[2].replace( "0", "" );
        }
        if ( datas[1].substring( 0, 1 ) === "0" ) {
            datas[1] = datas[1].replace( "0", "" );
        }
        let o = Object.create( { date: { year: datas[0], month: datas[1], day: datas[2] } } );
        return o;
    }

    parseDateJavaToDateJS( data: Date ) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.toString().split( "T" );
        s = s[0].split( "-" );
        let d: Date = new Date( s[0] + "-" + s[1] + "-" + s[2] );
        return d;
    }

    getGridItensPergunta( itens: Array<ItemPerguntaFichaColeta> ) {
        let s: number = Math.floor( 10 / itens.length );
        return "col s" + s.toString();
    }

    getGridItensResposta( itens: Array<ItemRespostaFichaColeta> ) {
        let s: number = Math.floor( 10 / itens.length );
        return "col s" + s.toString();
    }

    getArrayItensResposta( item: ItemRespostaFichaColeta ) {
        let ret = [];
        
        while ( item != null && item != undefined ) {
            ret.push( item );
            item = item.getItem();
        }

        return ret;
    }

    verifyExistItemResposta( itens ) {
        if ( itens != null ) return true;
        return false;
    }

    contains( texto: string ) {
        let ret: string = "";
        if ( texto == undefined ) return;
        if ( texto.includes( "SIM" ) ) ret = "SIM";
        else if ( texto.includes( "ANAMNESE" ) ) ret = "ANAMNESE";
        else if ( texto.includes( "DOUBLE" ) ) ret = "DOUBLE";
        else if ( texto.includes( "INTEIRO" ) ) ret = "INTEIRO";
        else if ( texto.includes( "TEXTO" ) ) ret = "TEXTO";
        else if ( texto.includes( "ENUM" ) ) ret = "ENUM";
        else if ( texto.includes( "EXAME F" ) ) ret = "EXAMEF";
        else if ( texto.includes( "EXAME ODONTOL" ) ) ret = "EXAMEODONTOL";
        else if ( texto.includes( "BITOS ALIMENTARES" ) ) ret = "BITOSALIMENTARES";
        else if ( texto.includes( "TESTE DE FAGERSTR" ) ) ret = "TESTEDEFAGERSTR";
        else if ( texto.includes( "VEL DE ESTRESSE" ) ) ret = "VELDEESTRESSE";
        return ret;
    }

    selectStatusSimNao( itens, indexGrupo, indexRespostaByGrupo, status ) {
        let indexResposta = this.getIndexRespostaByGrupo(indexGrupo, indexRespostaByGrupo);
        
        if ( status == "SIM" ) {
            this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()[indexResposta]
                .setItens( [] );
            this.addItemResposta( itens, indexGrupo, indexRespostaByGrupo );
        } else { 
            this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()[indexResposta]
                .setItens( [] );
        }
    }
    
    addItemResposta( itens: Array<ItemPerguntaFichaColeta>, indexGrupo, indexRespostaByGrupo ) {
        let quantidadeItens = itens.length;
        let indexResposta = this.getIndexRespostaByGrupo(indexGrupo, indexRespostaByGrupo);
        
        if ( quantidadeItens == 0 ) 
            return;
        else if ( quantidadeItens == 1 ) {
            this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()[indexResposta]
                .getItens().push( new ItemRespostaFichaColeta() );
            return;
        }
        
        let item: ItemRespostaFichaColeta =
            new ItemRespostaFichaColetaBuilder().initialize( new ItemRespostaFichaColeta() );
        let itemRespostaFichaColeta: ItemRespostaFichaColeta;
        
        if ( item.getItem() != undefined ) {
            
            itemRespostaFichaColeta = item.getItem();
        
            for ( let i = 0; i < quantidadeItens-2; i++ ) {
                itemRespostaFichaColeta.setItem(new ItemRespostaFichaColeta());
                itemRespostaFichaColeta = itemRespostaFichaColeta.getItem(); 
            }
        }
                
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()[indexResposta]
            .getItens().push( item );
    }
    
    constructItemRespostaFichaColeta( quantidadeItens: number, itemRespostaFichaColeta: ItemRespostaFichaColeta ) {
        if ( quantidadeItens <= 3 ) return;
        quantidadeItens--;
        
        let item: ItemRespostaFichaColeta =
            new ItemRespostaFichaColetaBuilder().initialize( new ItemRespostaFichaColeta() );

        itemRespostaFichaColeta.setItem( item );
        this.constructItemRespostaFichaColeta( quantidadeItens, item );
    }
    
    removeItemResposta( indexGrupo, indexRespostaByGrupo, itemIndex ) {
        let indexResposta = this.getIndexRespostaByGrupo(indexGrupo, indexRespostaByGrupo);
        
        if ( this.atendimento.getFilaEsperaOcupacional().
              getFichaColeta().getRespostaFichaColetas()[indexResposta].getItens().length == 1 ) return;

        this.atendimento.getFilaEsperaOcupacional().
            getFichaColeta().getRespostaFichaColetas()[indexResposta].getItens().splice( itemIndex, 1 );
    }
    
    verifyRespostaSimNao( indexGrupo, indexRespostaByGrupo ) {
        let indexResposta = this.getIndexRespostaByGrupo(indexGrupo, indexRespostaByGrupo);
        
        if ( this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()[indexResposta] != undefined &&
                this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()[indexResposta]
                .getItens().length > 0 ) return true;
        else return false;
    }
    
    getIndexRespostaByGrupo( indexGrupo, itemIndex ) {
        let quantidadeItensAnteriores = this.getQuantidadeItensAnteriores( indexGrupo );
        
        return quantidadeItensAnteriores + itemIndex;
    }
    
    getQuantidadeItensAnteriores( indexGrupo ) {
        let qtdItens = 0;
        for ( let i=0; i < indexGrupo; i++ )
            qtdItens += this.quantidadeItemRespostasByGrupo[i];
        
        return qtdItens;
    }

    getTriagensTodosAtendimentos() {
        this.equipesTriagensTodosAtendimentos = new Array<Equipe>();
        this.triagensTodosAtendimentosByEquipe = [[]];
        
        this.atendimento.getTriagensTodosAtendimentos().forEach( t => {
            if ( t.getJustificativa() != undefined || t.getJustificativa() != '' ) {
                if ( t.getDiagnostico() == undefined )
                    t.setDiagnostico(new DiagnosticoBuilder().initialize(new Diagnostico()));
                if (t.getIntervencao() == undefined )
                    t.setIntervencao(new IntervencaoBuilder().initialize(new Intervencao()));
                if (t.getEquipeAbordagem() == undefined )
                    t.setEquipeAbordagem(new EquipeBuilder().initialize(new Equipe()));
                if (t.getPrazo() == undefined )
                    t.setPrazo('');
            }
            
            if ( t.getDiagnostico() != undefined && t.getDiagnostico().getId() > 0 || 
                    ( t.getJustificativa() != undefined && t.getJustificativa() != "" ) ) {
                if ( this.equipesTriagensTodosAtendimentos.find( e => e.getId() == t.getIndicadorSast().getEquipe().getId() ) == undefined )
                    this.equipesTriagensTodosAtendimentos.push( t.getIndicadorSast().getEquipe() );
    
                if ( this.triagensTodosAtendimentosByEquipe[t.getIndicadorSast().getEquipe().getId()] == undefined ) {
                    this.triagensTodosAtendimentosByEquipe[t.getIndicadorSast().getEquipe().getId()] = new Array<Triagem>();
                }
    
                this.triagensTodosAtendimentosByEquipe[t.getIndicadorSast().getEquipe().getId()].push( t );
            }
        } )
    }

    getRespostasFichaColeta() {
        this.gruposRespostasFichaColeta = new Array<string>();
        this.respostasFichaColetaByGrupo = [[]];
        let countIndexGrupo = -1;
        let qtdItens = 1;
        
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas().forEach( r => {
            if ( this.gruposRespostasFichaColeta.find( e => e == r.getPergunta().getGrupo() ) == undefined ) {
                this.gruposRespostasFichaColeta.push( r.getPergunta().getGrupo() );
                countIndexGrupo++;
                qtdItens = 1;
            }
            
            if ( this.respostasFichaColetaByGrupo[r.getPergunta().getGrupo()] == undefined ) {
                this.respostasFichaColetaByGrupo[r.getPergunta().getGrupo()] = new Array<Triagem>();
            }

            this.respostasFichaColetaByGrupo[r.getPergunta().getGrupo()].push( r );
            this.quantidadeItemRespostasByGrupo[countIndexGrupo] = qtdItens++; 
        } )
    }

    catchConfiguration( error ) {
        switch ( error.status ) {
            case 401:
                localStorage.clear();
                this.router.navigate( ["login"] );
                break;
        }
    }

    getIndiceDescricao( triagem: Triagem ) {
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];
    }

    verifyIndiceTriagem( triagem: Triagem ) {
        if ( triagem.getIndice() > -1 ) return true;

        return false;
    }

    getDiagnostico( index: number ) {
        if ( this.validDiagnostico == this.atendimento.getTriagens()[index].getDiagnostico().getDescricao() ) return;
        if ( this.atendimento.getTriagens()[index].getDiagnostico().getDescricao() !== undefined ) {
            let diagnostico = this.diagnosticos.find( d => {
                if ( ( d.getCodigo() + " - " + d.getDescricao() ).trim() ==
                    this.atendimento.getTriagens()[index].getDiagnostico().getDescricao().trim() ||
                    d.getDescricao().trim() == this.atendimento.getTriagens()[index].getDiagnostico().getDescricao().trim() )
                    return true;
                else return false;
            } );

            if ( diagnostico !== undefined ) {
                this.atendimento.getTriagens()[index].setDiagnostico( diagnostico );
                this.validDiagnostico = this.atendimento.getTriagens()[index].getDiagnostico().getDescricao();
            } else this.atendimento.getTriagens()[index].setDiagnostico( new DiagnosticoBuilder().initialize( new Diagnostico() ) );
        } else this.atendimento.getTriagens()[index].setDiagnostico( new DiagnosticoBuilder().initialize( new Diagnostico() ) );
    }

    private oldDescricaoDiagnostico: string;
    selectDiagnosticoByDescricaoAndAbreviacao( evento ) {
        if ( this.oldDescricaoDiagnostico != evento ) {
            this.oldDescricaoDiagnostico = evento;
            if ( evento.length >= 6 ) {
                this.atendimentoService.getDiagnosticoByDescricaoAndAbreviacao( evento, this.profissional.getEquipe().getAbreviacao() )
                    .then( res => {
                        this.diagnosticos = new DiagnosticoBuilder().cloneList( res.json() );
                        this.autocompleteDiagnostico = [this.buildAutocompleteDiagnostico( this.diagnosticos )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    private oldCodigoDiagnostico: string;
    selectDiagnosticoByCodigoAndAbreviacao( evento ) {
        if ( this.oldCodigoDiagnostico != evento ) {
            this.oldCodigoDiagnostico = evento;
            if ( evento.length < 6 ) {
                this.atendimentoService.getDiagnosticoByCodigoAndAbreviacao( evento, this.profissional.getEquipe().getAbreviacao() )
                    .then( res => {
                        this.diagnosticos = new DiagnosticoBuilder().cloneList( res.json() );
                        this.autocompleteDiagnostico = [this.buildAutocompleteDiagnostico( this.diagnosticos )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    buildAutocompleteDiagnostico( diagnosticos: Array<Diagnostico> ) {
        let data = {};
        diagnosticos.forEach( item => {
            data[item.getCodigo() + " - " + item.getDescricao()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }

    getIntervencao( index: number ) {
//        if ( this.validIntervencao == this.atendimento.getTriagens()[index].getIntervencao().getDescricao() ) return;
        if ( this.atendimento.getTriagens()[index].getIntervencao().getDescricao() !== undefined ) {
            let intervencao = this.intervencoes.find( i => {
                if ( i.getDescricao().trim() == this.atendimento.getTriagens()[index].getIntervencao().getDescricao().trim() )
                    return true;
                else return false;
            } );
        
            if ( intervencao !== undefined ) {
                this.atendimento.getTriagens()[index].setIntervencao( intervencao );
                this.validIntervencao = this.atendimento.getTriagens()[index].getIntervencao().getDescricao();
            } else this.atendimento.getTriagens()[index].setIntervencao( new IntervencaoBuilder().initialize( new Intervencao() ) );
        } else this.atendimento.getTriagens()[index].setIntervencao( new IntervencaoBuilder().initialize( new Intervencao() ) );
    }

    private oldDescricaoIntervencao: string;
    selectIntervencaoByDescricaoAndAbreviacao( evento ) {
        if ( this.oldDescricaoIntervencao != evento ) {
            this.oldDescricaoIntervencao = evento;
            if ( evento.length > 3 ) {
                this.atendimentoService.getIntervencaoByDescricaoAndAbreviacao( evento, this.profissional.getEquipe().getAbreviacao() )
                    .then( res => {
                        this.intervencoes = new IntervencaoBuilder().cloneList( res.json() );
                        this.autocompleteIntervencao = [this.buildAutocompleteIntervencao( this.intervencoes )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    buildAutocompleteIntervencao( intervencoes: Array<Intervencao> ) {
        let data = {};
        intervencoes.forEach( item => {
            data[item.getDescricao()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }

    getEquipeAbordagem( index: number ) {
//        if ( this.validEquipeAbordagem == this.atendimento.getTriagens()[index].getEquipeAbordagem().getNome() ) return;
        if ( this.atendimento.getTriagens()[index].getEquipeAbordagem().getNome() !== undefined ) {
            let equipe = this.equipeAbordagens.find( e => {
                if ( e.getNome().trim() == this.atendimento.getTriagens()[index].getEquipeAbordagem().getNome().trim() )
                    return true;
                else return false;
            } );

            if ( equipe !== undefined ) {
                this.atendimento.getTriagens()[index].setEquipeAbordagem( equipe );
                this.validEquipeAbordagem = this.atendimento.getTriagens()[index].getEquipeAbordagem().getNome();
            } else this.atendimento.getTriagens()[index].setEquipeAbordagem( new EquipeBuilder().initialize( new Equipe() ) );
        } else this.atendimento.getTriagens()[index].setEquipeAbordagem( new EquipeBuilder().initialize( new Equipe() ) );
    }

    private oldNomeEquipeAbordagem: string;
    selectEquipeAbordagemByName( evento ) {
        if ( this.oldNomeEquipeAbordagem != evento ) {
            this.oldNomeEquipeAbordagem = evento;
            if ( evento.length > 3 ) {
                this.atendimentoService.getEquipeAbordagemByName( evento )
                    .then( res => {
                        this.equipeAbordagens = new EquipeBuilder().cloneList( res.json() );
                        this.autocompleteEquipeAbordagem = [this.buildAutocompleteEquipeAbordagem( this.equipeAbordagens )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    buildAutocompleteEquipeAbordagem( equipeAbordagens: Array<Equipe> ) {
        let data = {};
        equipeAbordagens.forEach( item => {
            data[item.getNome()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }

    selectAcolhimentoTab() {
        setTimeout(() => {
            if ( this.profissional.getEquipe().getAbreviacao() == "ACO" ) return '';
            else return 'disabled';
        }, 500 );
    }

    addEquipe( valor: number ) {
        if ( valor != 0 ) {
            let e = this.equipesSelecteds.find( c => c.getId() == valor );
            if ( e == undefined ) {
                let equipe: Equipe = this.equipes.find( eq => eq.getId() == valor );
                this.equipesSelecteds.push( equipe );
                this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().setEquipes( this.equipesSelecteds );
            }
        }
    }

    removeEquipe( i: number ) {
        this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().getEquipes().splice( i, 1 );
    }
    
    parseDatePickerToDate( data ) {
        if ( data === undefined || data === null ) {
            return null;
        } else if ( data instanceof Date ) {
            return data;
        }
        let d: Date = new Date( data.date.year, data.date.month - 1, data.date.day );
        return d;
    }
    
    getEnumsPergunta( resposta: RespostaFichaColeta ) {
        let path = resposta.getPergunta().getPath();
        
        if ( this.listPathsEnumPergunta.find(l => l == path) == undefined ) {
            this.atendimentoService.getEnums(path)
                .then(res => {
                    this.listPathsEnumPergunta.push(path);
                    this.listEnumsByPathPergunta[path] = new Array<string>();
                    this.listEnumsByPathPergunta[path] = Object.keys( res.json() ).sort();
                })
                .catch(error => {
                    console.log("Erro ao retornar enums");
                    return [];
                })
        }

        return this.listEnumsByPathPergunta[path];
    }

    getEnumsItem( resposta: RespostaFichaColeta, indexPath: number ) {
        let path = resposta.getPergunta().getItens()[indexPath].getPath();
        
        if ( this.listPathsEnumItem.find(l => l == path) == undefined ) {
            this.atendimentoService.getEnums(path)
                .then(res => {
                    this.listPathsEnumItem.push(path);
                    this.listEnumsByPathItem[path] = new Array<string>();
                    this.listEnumsByPathItem[path] = Object.keys( res.json() ).sort();
                })
                .catch(error => {
                    console.log("Erro ao retornar enums");
                    return [];
                })
        } 

        return this.listEnumsByPathItem[path];
    }
    
    verifyItemPath( resposta: RespostaFichaColeta, indexPath: number ) {
        if ( resposta.getPergunta().getItens()[indexPath] == undefined ) return;
        
        let path = resposta.getPergunta().getItens()[indexPath].getPath();
        
        if ( path != undefined && path != '' )
            return true;
        
        return false;
    }
    
    openModalDiagnostico( triagem: Triagem ) {
        this.value = "$*new*$";
        $("input[name='filter-diagnostico-descricao']").val('');
        this.activeDiagnostico = true;
        this.activeIntervencao = false;
        this.flagIdTriagem = triagem.getId();
        this.atendimentoService.getEixosByEquipe(this.profissional.getEquipe().getId())
            .then(res => {
                this.eixos = new EixoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao retornar os eixos.");
            })
        this.modalDiagnostico.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchDiagnosticos( ) {
        this.filter = $("input[name='filter-diagnostico-descricao']").val('');
        this.value = '$*new*$';
        if ( this.selectEixoId != "" ) {
            this.atendimentoService.getDiagnosticoByEixo( Number(this.selectEixoId), this.profissional.getEquipe().getId() )
                .then(res => {
                    this.arrayDiagnostico = new DiagnosticoBuilder().cloneList(res.json());
                })
                .catch(error => {
                    console.log("Erro ao buscar o diagnostico por descricao");
                })
        } else {
            this.toastParams = ["Por favor, seleciona um eixo", 4000];
            this.globalActions.emit( 'toast' );
        }        
    }
    
    selectDiagnostico( diagnostico: Diagnostico ) {
        let triagem = this.atendimento.getTriagens().find(t => t.getId() == this.flagIdTriagem);
        triagem.setDiagnostico(diagnostico);
        this.modalDiagnostico.emit( { action: "modal", params: ['close'] } );
    }
    
    cancelarModalDiagnostico() {
        this.modalDiagnostico.emit( { action: "modal", params: ['close'] } );
    }
    
    openModalIntervencao( triagem: Triagem ) {
        this.value = "$*new*$";
        this.filter = $("input[name='filter-intervencao-descricao']").val('');
        this.activeDiagnostico = false;
        this.activeIntervencao = true;
        this.flagIdTriagem = triagem.getId();
        this.fetchIntervencao()
        this.modalIntervencao.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchIntervencao() {
        this.atendimentoService.getIntervencoesByEquipe(this.profissional.getEquipe().getId())
            .then(res => {
                this.arrayIntervencao = new IntervencaoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar o diagnostico por descricao");
            })
    }
    
    selectIntervencao( intervencao: Intervencao) {
        let triagem = this.atendimento.getTriagens().find(t => t.getId() == this.flagIdTriagem);
        triagem.setIntervencao(intervencao);
        this.modalIntervencao.emit( { action: "modal", params: ['close'] } );
    }
    
    cancelarModalIntervencao() {
        this.modalIntervencao.emit( { action: "modal", params: ['close'] } );
    }
    
    openModalEquipe( triagem: Triagem ) {
        this.flagIdTriagem = triagem.getId();
        this.fetchEquipe();
        this.modalEquipe.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchEquipe() {
        this.atendimentoService.getEquipes()
            .then(res => {
                this.arrayEquipe = new EquipeBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar o diagnostico por descricao");
            })
    }
    
    selectEquipe( equipe: Equipe ) {
        let triagem = this.atendimento.getTriagens().find(t => t.getId() == this.flagIdTriagem);
        triagem.setEquipeAbordagem(equipe);
        this.modalEquipe.emit( { action: "modal", params: ['close'] } );
    }
    
    cancelarModalEquipe() {
        this.modalEquipe.emit( { action: "modal", params: ['close'] } );
    }
    
    selectFilter( event, type: string ) {
        let splitType = type.split('-');   
        this.filter = event;
        this.typeFilter = splitType[2];
        this.value = $('input[name='+type).val();
    }
    
    planejamentoBackground( triagem: Triagem ) {
        if ( triagem.getIndice() <= 2 )
            return 'red';
    }
    
}