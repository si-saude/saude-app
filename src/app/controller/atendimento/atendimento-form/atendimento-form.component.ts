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
    private idade: number;
    private myDatePickerOptions: IMyDpOptions;
    private globalActions;
    private toastParams;
    private tabsActions;
    private modalConfirmLocalizacao;
    audio: any;
    prazos: Array<string>;
    equipes: Array<Equipe>;
    equipesSelecteds: Array<Equipe>;
    disabledTab: string;
    existAtendimento: boolean;

    statusesSimNao: Array<string>;
    statusSim: Array<boolean>;
    
    diagnosticos: Array<Diagnostico>;
    validDiagnostico: string;
    autocompleteDiagnostico;
    
    intervencoes: Array<Intervencao>;
    validIntervencao: string;
    autocompleteIntervencao;
    
    equipeAbordagens: Array<Equipe>;
    validEquipeAbordagem: string;
    autocompleteEquipeAbordagem;
    
    equipesTriagensTodosAtendimentos: Array<Equipe>;
    triagensTodosAtendimentosByEquipe = [[]];
    
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
        this.statusSim = Array<boolean>();
        this.validDiagnostico = "";
        this.diagnosticos = new Array<Diagnostico>();
        this.validIntervencao = "";
        this.intervencoes = new Array<Intervencao>();
        this.prazos = new Array<string>();
        this.equipes = new Array<Equipe>();
        this.equipesSelecteds = new Array<Equipe>();
        this.equipesTriagensTodosAtendimentos = new Array<Equipe>();
        this.disabledTab = 'disabled';
        this.existAtendimento = false;
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
                                    
                                    if ( this.profissional.getEquipe().getAbreviacao() == "ACO" ) 
                                        this.disabledTab = '';
                                    else this.disabledTab = 'disabled';

                                    this.primeiraAtualizacao();

                                    this.inscricao = TimerObservable.create( 0, 15000 )
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
                this.equipes = new EquipeBuilder().cloneList(res.json());
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
                    
                    let riscoPotencial: RiscoPotencial = new RiscoPotencialBuilder().initialize(new RiscoPotencial());
                    let equipeResponsavel: Equipe = new EquipeBuilder().initialize(new Equipe());
                    equipeResponsavel.setNome("EQUIPE RESPONSAVEL");
                    riscoPotencial.setEquipeResponsavel(equipeResponsavel);
                    riscoPotencial.setInicioAgendamento(new Date());
                    riscoPotencial.setFimAgendamento(new Date());
                    riscoPotencial.setCondutaPercepcao("CONDUTA PERCEPCAO");
                    
                    this.atendimento.getFilaEsperaOcupacional().setRiscoPotencial(riscoPotencial)

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

            let respostasConteudoName: Array<string> = new Array<string>();
            $( ".resposta-conteudo:enabled" ).each( function( index ) {
                respostasConteudoName.push( $( this ).attr( 'ng-reflect-name' ) );
            } );

            respostasConteudoName.forEach( r => {
                $( ".resposta-conteudo[ng-reflect-name=" + r + "]" ).prop( "disabled", true );
            } )

            this.atendimentoService.atualizar( this.atendimento )
                .then( res => {
                    
                    respostasConteudoName.forEach( r => {
                        $( ".resposta-conteudo[ng-reflect-name=" + r + "]" ).prop( "disabled", false );
                    } )

                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    
                    let riscoPotencial: RiscoPotencial = new RiscoPotencialBuilder().initialize(new RiscoPotencial());
                    let equipeResponsavel: Equipe = new EquipeBuilder().initialize(new Equipe());
                    equipeResponsavel.setNome("EQUIPE RESPONSAVEL");
                    riscoPotencial.setEquipeResponsavel(equipeResponsavel);
                    riscoPotencial.setInicioAgendamento(new Date());
                    riscoPotencial.setFimAgendamento(new Date());
                    riscoPotencial.setCondutaPercepcao("CONDUTA PERCEPCAO");
                    
                    let triagem: Triagem = new Triagem();
                    let diagnostico: Diagnostico = new DiagnosticoBuilder().initialize(new Diagnostico());
                    let intervencao: Intervencao = new IntervencaoBuilder().initialize(new Intervencao());
                    let indicadorSast: IndicadorSast = new IndicadorSast();
                    let equipe: Equipe = new Equipe();
                    equipe.setNome( "EQUIPE 0" );
                    equipe.setId( 0 );
                    indicadorSast.setCodigo( "000" );
                    indicadorSast.setNome( "INDICADOR 0" );
                    indicadorSast.setIndice0( "Indice 00" );
                    indicadorSast.setIndice1( "Indice 01" );
                    indicadorSast.setIndice2( "Indice 02" );
                    indicadorSast.setIndice3( "Indice 03" );
                    indicadorSast.setIndice4( "Indice 04" );
                    indicadorSast.setObrigatorio( true );
                    triagem.setId( 0 );
                    triagem.setIndice(1);
                    triagem.setIndicadorSast( indicadorSast );
                    triagem.setEquipeAbordagem( equipe );
                    triagem.setDiagnostico(diagnostico);
                    triagem.setIntervencao(intervencao);
                    this.atendimento.getTriagens().push( triagem );
                    this.atendimento.getTriagensTodosAtendimentos().push(triagem);

                    intervencao = new IntervencaoBuilder().initialize(new Intervencao());
                    diagnostico = new DiagnosticoBuilder().initialize(new Diagnostico());
                    triagem = new Triagem();
                    indicadorSast = new IndicadorSast();
                    equipe = new Equipe();
                    equipe.setNome( "EQUIPE 0" );
                    equipe.setId( 0 );
                    indicadorSast.setNome( "INDICADOR 1" );
                    indicadorSast.setCodigo( "001" );
                    indicadorSast.setIndice0( "Indice 01" );
                    indicadorSast.setIndice1( "Indice 11" );
                    indicadorSast.setIndice2( "Indice 11" );
                    indicadorSast.setIndice3( "Indice 11" );
                    indicadorSast.setIndice4( "Indice 11" );
                    triagem.setId( 1 );
                    triagem.setIndice(1);
                    triagem.setIndicadorSast( indicadorSast );
                    triagem.setEquipeAbordagem( equipe );
                    triagem.setDiagnostico(diagnostico);
                    triagem.setIntervencao(intervencao);
                    this.atendimento.getTriagens().push( triagem );
                    this.atendimento.getTriagensTodosAtendimentos().push(triagem);

                    intervencao = new IntervencaoBuilder().initialize(new Intervencao());
                    diagnostico = new DiagnosticoBuilder().initialize(new Diagnostico());
                    triagem = new Triagem();
                    indicadorSast = new IndicadorSast();
                    equipe = new Equipe();
                    equipe.setNome( "EQUIPE 0" );
                    equipe.setId( 0 );
                    indicadorSast.setNome( "INDICADOR 1" );
                    indicadorSast.setCodigo( "001" );
                    indicadorSast.setIndice0( "Indice 01" );
                    indicadorSast.setIndice1( "Indice 11" );
                    indicadorSast.setIndice2( "Indice 11" );
                    indicadorSast.setIndice3( "Indice 11" );
                    indicadorSast.setIndice4( "Indice 11" );
                    triagem.setId( 2 );
                    triagem.setIndice(1);
                    triagem.setIndicadorSast( indicadorSast );
                    triagem.setEquipeAbordagem( equipe );
                    triagem.setDiagnostico(diagnostico);
                    triagem.setIntervencao(intervencao);
                    this.atendimento.getTriagens().push( triagem );
                    this.atendimento.getTriagensTodosAtendimentos().push(triagem);

                    intervencao = new IntervencaoBuilder().initialize(new Intervencao());
                    diagnostico = new DiagnosticoBuilder().initialize(new Diagnostico());
                    triagem = new Triagem();
                    indicadorSast = new IndicadorSast();
                    equipe = new Equipe();
                    equipe.setNome( "EQUIPE 0" );
                    equipe.setId( 0 );
                    indicadorSast.setNome( "INDICADOR 1" );
                    indicadorSast.setCodigo( "001" );
                    indicadorSast.setIndice0( "Indice 01" );
                    indicadorSast.setIndice1( "Indice 11" );
                    indicadorSast.setIndice2( "Indice 11" );
                    indicadorSast.setIndice3( "Indice 11" );
                    indicadorSast.setIndice4( "Indice 11" );
                    triagem.setId( 3 );
                    triagem.setIndice(1);
                    triagem.setIndicadorSast( indicadorSast );
                    triagem.setEquipeAbordagem( equipe );
                    triagem.setDiagnostico(diagnostico);
                    triagem.setIntervencao(intervencao);
                    this.atendimento.getTriagens().push( triagem );
                    this.atendimento.getTriagensTodosAtendimentos().push(triagem);

                    intervencao = new IntervencaoBuilder().initialize(new Intervencao());
                    diagnostico = new DiagnosticoBuilder().initialize(new Diagnostico());
                    triagem = new Triagem();
                    indicadorSast = new IndicadorSast();
                    equipe = new Equipe();
                    equipe.setNome( "EQUIPE 0" );
                    equipe.setId( 0 );
                    indicadorSast.setNome( "INDICADOR 1" );
                    indicadorSast.setCodigo( "001" );
                    indicadorSast.setIndice0( "Indice 01" );
                    indicadorSast.setIndice1( "Indice 11" );
                    indicadorSast.setIndice2( "Indice 11" );
                    indicadorSast.setIndice3( "Indice 11" );
                    indicadorSast.setIndice4( "Indice 11" );
                    triagem.setId( 4 );
                    triagem.setIndice(1);
                    triagem.setIndicadorSast( indicadorSast );
                    triagem.setEquipeAbordagem( equipe );
                    triagem.setDiagnostico(diagnostico);
                    triagem.setIntervencao(intervencao);
                    this.atendimento.getTriagens().push( triagem );
                    this.atendimento.getTriagensTodosAtendimentos().push(triagem);

                    intervencao = new IntervencaoBuilder().initialize(new Intervencao());
                    diagnostico = new DiagnosticoBuilder().initialize(new Diagnostico());
                    triagem = new Triagem();
                    indicadorSast = new IndicadorSast();
                    equipe = new Equipe();
                    indicadorSast.setNome( "INDICADOR 2" );
                    equipe.setNome( "EQUIPE 2" );
                    equipe.setId( 1 );
                    indicadorSast.setCodigo( "002" );
                    indicadorSast.setIndice0( "Indice 21" );
                    indicadorSast.setIndice1( "Indice 21" );
                    indicadorSast.setIndice2( "Indice 21" );
                    indicadorSast.setIndice3( "Indice 21" );
                    indicadorSast.setIndice4( "Indice 21" );
                    triagem.setId( 5 );
                    triagem.setIndice(1);
                    triagem.setIndicadorSast( indicadorSast );
                    triagem.setEquipeAbordagem( equipe );
                    triagem.setDiagnostico(diagnostico);
                    triagem.setIntervencao(intervencao);
                    this.atendimento.getTriagens().push( triagem );
                    this.atendimento.getTriagensTodosAtendimentos().push(triagem);

                    intervencao = new IntervencaoBuilder().initialize(new Intervencao());
                    diagnostico = new DiagnosticoBuilder().initialize(new Diagnostico());
                    triagem = new Triagem();
                    indicadorSast = new IndicadorSast();
                    equipe = new Equipe();
                    indicadorSast.setNome( "INDICADOR 3" );
                    equipe.setNome( "EQUIPE 3" );
                    equipe.setId( 2 );
                    indicadorSast.setCodigo( "003" );
                    indicadorSast.setIndice0( "Indice 31" );
                    indicadorSast.setIndice1( "Indice 31" );
                    indicadorSast.setIndice2( "Indice 31" );
                    indicadorSast.setIndice3( "Indice 31" );
                    indicadorSast.setIndice4( "Indice 31" );
                    indicadorSast.setObrigatorio( true );
                    triagem.setId( 6 );
                    triagem.setIndice(1);
                    triagem.setIndicadorSast( indicadorSast );
                    triagem.setEquipeAbordagem( equipe );
                    triagem.setDiagnostico(diagnostico);
                    triagem.setIntervencao(intervencao);
                    this.atendimento.getTriagens().push( triagem );
                    this.atendimento.getTriagensTodosAtendimentos().push(triagem);
                    
                    this.getTriagensTodosAtendimentos();

                    this.statusProfissional = this.atendimento.getFilaAtendimentoOcupacional().getStatus();
                    if ( this.atendimento.getId() > 0 ) {
                        this.localizacao = this.atendimento.getFilaAtendimentoOcupacional().getLocalizacao();
                        this.existLocalizacao = true;
                        this.existAtendimento = true;
                        this.setDataNascimento();

                        for ( let i = 0; i < $( ".tab" ).children().length; i++ ) {
                            if ( $( ".tab" ).children()[0].className == "active" )
                                this.tabsActions.emit( { action: "tabs", params: ['select_tab', 'atendimento'] } );
                        }

                        if ( this.atendimento.getFilaAtendimentoOcupacional().getStatus().length == 20 ) {
                            //                            this.audio.load();
                            //                            this.audio.play();
                        }
                    }
                } )
                .catch( error => {
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

    selectTriagem( indexEquipe, indexTriagem, indice ) {
        let i: string = "indice" + indice + "_" + indexTriagem.toString();

        if ( this.triagemIndices.get( indexTriagem ) != undefined ) {
            if ( this.triagemIndices.get( indexTriagem ) == Number( indice ) ) {
                $( "td[title=" + i + "]" ).css( "background", "" );
                this.atendimento.getTriagens()[indexTriagem].setIndice( -1 );
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
            this.atendimentoService.iniciar( this.atendimento )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    this.toastParams = ["Atendimento iniciado.", 4000];
                    this.globalActions.emit( 'toast' );
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
            this.atendimentoService.registrarAusencia( this.atendimento )
                .then( res => {
                    this.toastParams = ["Ausencia registrada", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
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

            this.atendimentoService.liberar( this.atendimento )
                .then( res => {
                    this.toastParams = ["Empregado liberado", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
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

//            this.atendimentoService.finalizar( this.atendimento )
//                .then( res => {
//                    this.toastParams = ["Atendimento finalizado", 4000];
//                    this.globalActions.emit( 'toast' );
//                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
//                } )
//                .catch( error => {
//                    this.catchConfiguration( error );
//                    this.toastParams = [error.text(), 4000];
//                    this.globalActions.emit( 'toast' );
//                } )
        }
    }

    devolverPraFila() {
        if ( this.atendimento.getId() > 0 ) {
            this.atendimentoService.devolverPraFila( this.atendimento )
                .then( res => {
                    this.toastParams = ["Empregado devolvido pra fila", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
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

            this.atendimentoService.finalizarPausar( this.atendimento )
                .then( res => {
                    this.toastParams = ["Atendimento finalizado", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                } )
                .catch( error => {
                    this.catchConfiguration( error );
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }

    verifyValidFichaColeta() {
        if ( $( ".resposta-conteudo:enabled" ).val() == "" )
            return false;
        return true;
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
    
        triagens = this.atendimento.getTriagens().filter(t => {
            let valid: boolean = true;
            if ( t.getIndice() > -1 && t.getIndice() < 3 ) {
                if ( t.getDiagnostico().getDescricao() == "" || t.getDiagnostico().getDescricao() == undefined ) {
                    triagensInvalidas.push(t);
                    return true;
                } else if ( t.getIntervencao().getDescricao() == "" || t.getIntervencao().getDescricao() == undefined ) {
                    triagensInvalidas.push(t);
                    return true;                    
                } else if ( t.getEquipeAbordagem().getNome() == "" || t.getEquipeAbordagem().getNome() == undefined ) {
                    triagensInvalidas.push(t);
                    return true;
                } else if ( t.getPrazo() == "" || t.getPrazo() == undefined ) {
                    triagensInvalidas.push(t);
                    return true;                    
                }
            }
            
            return false;
        })
    
        if ( triagens.length > 0 )
            triagensInvalidas.forEach(t => {
                if ( t.getJustificativa() == "" || t.getJustificativa() == undefined )
                    ret = false;
            } );
        else ret = false;
        
        return ret;
    }

    verifyEquipe( resposta: RespostaFichaColeta ) {
        let e: Equipe = resposta.getPergunta().getEquipes().find( e => e.getId() == this.profissional.getEquipe().getId() );

        if ( e != undefined ) return false;
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

    setDataNascimento() {
        if ( this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getDataNascimento() != undefined ) {
            this.dataNascimento = this.parseDataToObjectDatePicker( this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getDataNascimento() );
        }
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
        else if ( texto.includes( "EXAME F" ) ) ret = "EXAMEF";
        else if ( texto.includes( "EXAME ODONTOL" ) ) ret = "EXAMEODONTOL";
        else if ( texto.includes( "BITOS ALIMENTARES" ) ) ret = "BITOSALIMENTARES";
        else if ( texto.includes( "TESTE DE FAGERSTR" ) ) ret = "TESTEDEFAGERSTR";
        else if ( texto.includes( "VEL DE ESTRESSE" ) ) ret = "VELDEESTRESSE";
        return ret;
    }

    selectStatusSimNao( itens, indexResposta, status ) {
        if ( status == "SIM" ) {
            this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()[indexResposta]
                .setItens( [] );
            this.addItemResposta( itens, indexResposta );
            this.statusSim[indexResposta] = true;
        } else this.statusSim[indexResposta] = false;
    }

    addItemResposta( itens: Array<ItemPerguntaFichaColeta>, indexResposta ) {
        let quantidadeItens = itens.length;

        let itemRespostaFichaColeta: ItemRespostaFichaColeta =
            new ItemRespostaFichaColetaBuilder().initialize( new ItemRespostaFichaColeta() );

        this.constructItemRespostaFichaColeta( quantidadeItens, itemRespostaFichaColeta );

        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()[indexResposta]
            .getItens().push( itemRespostaFichaColeta );
    }

    removeItemResposta( respostaIndex, itemIndex ) {
        this.atendimento.getFilaEsperaOcupacional().
            getFichaColeta().getRespostaFichaColetas()[respostaIndex].getItens().splice( itemIndex, 1 );
    }

    constructItemRespostaFichaColeta( quantidadeItens: number, itemRespostaFichaColeta: ItemRespostaFichaColeta ) {
        quantidadeItens--;
        if ( quantidadeItens == 1 ) return;

        let item: ItemRespostaFichaColeta =
            new ItemRespostaFichaColetaBuilder().initialize( new ItemRespostaFichaColeta() );

        itemRespostaFichaColeta.setItem( item );
        this.constructItemRespostaFichaColeta( quantidadeItens, item );
    }

    getTriagensTodosAtendimentos() {
        this.atendimento.getTriagensTodosAtendimentos().forEach( t => {
            if ( this.equipesTriagensTodosAtendimentos.find(e => e.getId() == t.getEquipeAbordagem().getId()) == undefined )
                this.equipesTriagensTodosAtendimentos.push( t.getEquipeAbordagem() );
            
            if ( this.triagensTodosAtendimentosByEquipe[t.getEquipeAbordagem().getId()] == undefined ) {
                this.triagensTodosAtendimentosByEquipe[t.getEquipeAbordagem().getId()] = new Array<Triagem>();
            }
            
            this.triagensTodosAtendimentosByEquipe[t.getEquipeAbordagem().getId()].push(t);
        })
    }
    
    getEquipesTriagensTodosAtendimentos() {
//        this.atendimento.getTriagensTodosAtendimentos().forEach( t => {
//            if ( eqps.find( e => e.getId() == t.getEquipeAbordagem().getId() ) == undefined ) {
//                this.equipesTriagensTodosAtendimentos.push( t.getEquipeAbordagem() );
//            }
//        } )
//
//        return this.equipesTriagensTodosAtendimentos;
    }
    
    getTriagensTodosAtendimentosByEquipe( equipe: Equipe ) {
//        this.triagensTodosAtendimentosByEquipe = this.atendimento.getTriagensTodosAtendimentos().filter( 
//                t => t.getEquipeAbordagem().getId() == equipe.getId() );
//
//        return listTriagens;
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
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice"+triagem.getIndice()];
    }
    
    verifyIndiceTriagem( triagem: Triagem ) {
        if ( triagem.getIndice() > -1 ) return true;
        
        return false;
    }
    
    getDiagnostico(index: number) {
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
                this.atendimento.getTriagens()[index].setDiagnostico(diagnostico);
                this.validDiagnostico = this.atendimento.getTriagens()[index].getDiagnostico().getDescricao();
            } else this.atendimento.getTriagens()[index].setDiagnostico( new DiagnosticoBuilder().initialize( new Diagnostico() ) );
        } else this.atendimento.getTriagens()[index].setDiagnostico( new DiagnosticoBuilder().initialize( new Diagnostico() ) );
    }

    private oldDescricaoDiagnostico: string;
    selectDiagnosticoByDescricao( evento ) {
        if ( this.oldDescricaoDiagnostico != evento ) {
            this.oldDescricaoDiagnostico = evento;
            if ( evento.length > 6 ) {
                this.atendimentoService.getDiagnosticoByDescricao( evento )
                    .then( res => {
                        this.diagnosticos = new DiagnosticoBuilder().cloneList(res.json());
                        this.autocompleteDiagnostico = [this.buildAutocompleteDiagnostico( this.diagnosticos )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    private oldCodigoDiagnostico: string;
    selectDiagnosticoByCodigo( evento ) {
        if ( this.oldCodigoDiagnostico != evento ) {
            this.oldCodigoDiagnostico = evento;
            if ( evento.length < 6 ) {
                this.atendimentoService.getDiagnosticoByCodigo( evento )
                    .then( res => {
                        this.diagnosticos = new DiagnosticoBuilder().cloneList(res.json());
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
    
    getIntervencao(index: number) {
        if ( this.validIntervencao == this.atendimento.getTriagens()[index].getIntervencao().getDescricao() ) return;
        if ( this.atendimento.getTriagens()[index].getIntervencao().getDescricao() !== undefined ) {
            let intervencao = this.intervencoes.find( d => {
                if ( d.getDescricao().trim() == this.atendimento.getTriagens()[index].getIntervencao().getDescricao().trim() )
                    return true;
                else return false;
            } );
            
            if ( intervencao !== undefined ) {
                this.atendimento.getTriagens()[index].setIntervencao(intervencao);
                this.validIntervencao = this.atendimento.getTriagens()[index].getIntervencao().getDescricao();
            } else this.atendimento.getTriagens()[index].setIntervencao( new IntervencaoBuilder().initialize( new Intervencao() ) );
        } else this.atendimento.getTriagens()[index].setIntervencao( new IntervencaoBuilder().initialize( new Intervencao() ) );
    }

    private oldDescricaoIntervencao: string;
    selectIntervencaoByDescricao( evento ) {
        if ( this.oldDescricaoIntervencao != evento ) {
            this.oldDescricaoIntervencao = evento;
            if ( evento.length > 3 ) {
                this.atendimentoService.getIntervencaoByDescricao( evento )
                    .then( res => {
                        this.intervencoes = new IntervencaoBuilder().cloneList(res.json());
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
    
    getEquipeAbordagem(index: number) {
        if ( this.validEquipeAbordagem == this.atendimento.getTriagens()[index].getEquipeAbordagem().getNome() ) return;
        if ( this.atendimento.getTriagens()[index].getEquipeAbordagem().getNome() !== undefined ) {
            let equipe = this.equipeAbordagens.find( e => {
                if ( e.getNome().trim() == this.atendimento.getTriagens()[index].getEquipeAbordagem().getNome().trim() )
                    return true;
                else return false;
            } );
            
            if ( equipe !== undefined ) {
                this.atendimento.getTriagens()[index].setEquipeAbordagem(equipe);
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
                        this.equipeAbordagens = new EquipeBuilder().cloneList(res.json());
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
        console.log(this.profissional);
        setTimeout(() => {
            console.log(this.profissional.getEquipe().getAbreviacao() == "ACO");
            if ( this.profissional.getEquipe().getAbreviacao() == "ACO" ) return '';
            else return 'disabled';
        }, 500);
    }
    
    addEquipe(valor: number) {
        if ( valor != 0 ) {
            let e = this.equipesSelecteds.find(c => c.getId() == valor);
            if ( e == undefined ) {
                let equipe: Equipe = this.equipes.find(eq => eq.getId() == valor);
                this.equipesSelecteds.push(equipe);
                this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().setEquipes(this.equipesSelecteds);
            }
        }
    }

    removeEquipe(i: number) {
        this.atendimento.getFilaEsperaOcupacional().getRiscoPotencial().getEquipes().splice(i, 1);
    }
    
}