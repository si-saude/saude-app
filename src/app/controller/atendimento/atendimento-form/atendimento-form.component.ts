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
import { IndicadorSast } from './../../../model/indicador-sast';
import { IndicadorSastBuilder } from './../../indicador-sast/indicador-sast.builder';
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
    private triagens: Array<Triagem>;
    //contem os indices j� clicados, key = index da triagem, value = numero do indice
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

    constructor( private route: ActivatedRoute, private router: Router,
        private atendimentoService: AtendimentoService ) {
        this.nomeProfissional = "";
        this.statusProfissional = "";
        this.localizacao = new LocalizacaoBuilder().initialize(this.localizacao);
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.atendimento = new AtendimentoBuilder().initialize( this.atendimento );
        this.atendimentos = new AtendimentoBuilder().initializeList( this.atendimentos );
        this.triagens = new TriagemBuilder().initializeList( this.triagens );
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
    }

    ngOnInit() {
        this.audio.src = "./../../../../assets/audio/beep.mp3";
        
        $(document).keypress(function(event){
            if (event.charCode == 13) return false; 
        });
        
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

                                    this.inscricao = TimerObservable.create( 0, 60000 )
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
                                this.catchConfiguration(error);
                            } )
                    } else {
                        this.router.navigate( ["/login"] );
                        return;
                    }
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario." );
                    this.catchConfiguration(error);
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
                console.log( "Erro ao retornar as localiza��es." );
            } )
    }
    
    confirmarLocalizacao() {
        console.log(this.localizacao);
        //verifico no openModalConfirmLocalizacao() se o id da localizacao eh maior que zero
        this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize( this.filaAtendimentoOcupacional );
        this.filaAtendimentoOcupacional.setProfissional( this.profissional );
        this.filaAtendimentoOcupacional.setLocalizacao( this.localizacao );
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
            this.atendimentoService.atualizar( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    //armengue
                    let triagem: Triagem = new TriagemBuilder().initialize(new Triagem());
                    triagem.getIndicadorSast().setNome("TESTE");
                    triagem.getIndicadorSast().setIndice0("INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0");
                    triagem.getIndicadorSast().setIndice1("INDICE 1");
                    triagem.getIndicadorSast().setIndice2("INDICE 2");
                    triagem.getIndicadorSast().setIndice3("INDICE 3");
                    triagem.getIndicadorSast().setIndice4("INDICE 4");
                    
                    let triagem2: Triagem = new TriagemBuilder().initialize(new Triagem());
                    triagem2.getIndicadorSast().setNome("TESTE");
                    triagem2.getIndicadorSast().setIndice0("INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0");
                    triagem2.getIndicadorSast().setIndice1("INDICE 1");
                    triagem2.getIndicadorSast().setIndice2("INDICE 2");
                    triagem2.getIndicadorSast().setIndice3("INDICE 3");
                    triagem2.getIndicadorSast().setIndice4("INDICE 4");
                    
                    this.atendimento.getTriagens().push(triagem);
                    this.atendimento.getTriagens().push(triagem2);
                    this.atendimento.getTriagens().push(triagem2);
                    this.atendimento.getTriagens().push(triagem2);
                    this.atendimento.getTriagens().push(triagem2);
                    this.triagens = this.atendimento.getTriagens();
                    
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
                    this.catchConfiguration(error);
                    this.filaAtendimentoOcupacional = undefined;
                    console.log( "Erro ao atualizar primeira vez: " + error );
                } )
        } else {
            console.log( "Profissional nao setado." )
        }
    }
    
    atualizar() {
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.atendimentoService.atualizar( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    //armengue
                    let triagem: Triagem = new TriagemBuilder().initialize(new Triagem());
                    triagem.getIndicadorSast().setNome("TESTE");
                    triagem.getIndicadorSast().setIndice0("INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0");
                    triagem.getIndicadorSast().setIndice1("INDICE 1");
                    triagem.getIndicadorSast().setIndice2("INDICE 2");
                    triagem.getIndicadorSast().setIndice3("INDICE 3");
                    triagem.getIndicadorSast().setIndice4("INDICE 4");
                    
                    let triagem2: Triagem = new TriagemBuilder().initialize(new Triagem());
                    triagem2.getIndicadorSast().setNome("TESTE");
                    triagem2.getIndicadorSast().setIndice0("INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0 INDICE 0");
                    triagem2.getIndicadorSast().setIndice1("INDICE 1");
                    triagem2.getIndicadorSast().setIndice2("INDICE 2");
                    triagem2.getIndicadorSast().setIndice3("INDICE 3");
                    triagem2.getIndicadorSast().setIndice4("INDICE 4");
                    
                    this.atendimento.getTriagens().push(triagem);
                    this.atendimento.getTriagens().push(triagem2);
                    this.atendimento.getTriagens().push(triagem2);
                    this.atendimento.getTriagens().push(triagem2);
                    this.atendimento.getTriagens().push(triagem2);
                    this.triagens = this.atendimento.getTriagens();
                    
                    this.statusProfissional = this.atendimento.getFilaAtendimentoOcupacional().getStatus();
                    if ( this.atendimento.getId() > 0 ) {
                        this.setDataNascimento();
                        this.tabsActions.emit({action:"tabs", params:['select_tab', 'atendimento']});
                        
                        if ( this.atendimento.getFilaAtendimentoOcupacional().getStatus().length == 20){
                            this.audio.load();
                            this.audio.play();
                        }
                    }
                } )
                .catch( error => {
                    this.catchConfiguration(error);
                    console.log( "Erro ao atualizar: " + error );
                    this.atendimento = new AtendimentoBuilder().initialize(new Atendimento());
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
                    this.catchConfiguration(error);
                    console.log( "Erro ao atualizar lista: " + error );
                } )
        } else {
            console.log( "Fila de atendimento nao preenchida." )
        }
    }
    
    selectTriagem(indexTriagem, indice) {
        let i: string = "indice"+indice+"_"+indexTriagem.toString();
    
        if ( this.triagemIndices.get( indexTriagem ) != undefined ) {
            if ( this.triagemIndices.get( indexTriagem ) == Number(indice) ) {
                $( "td[title=" + i + "]" ).css( "background", "" );
                this.atendimento.getTriagens()[indexTriagem].setIndice( -1 );
                return;
            }
            let iAntigo: string = "indice"+this.triagemIndices.get( indexTriagem )+"_"+indexTriagem.toString();
            $( "td[title=" + iAntigo + "]" ).css( "background", "" );
        }
        
        
        $("td[title=" + i + "]").css("background", "#D4D4D4");
        
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
                    this.catchConfiguration(error);
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
                    this.catchConfiguration(error);
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
                    this.catchConfiguration(error);
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
                    this.catchConfiguration(error);
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
                    this.catchConfiguration(error);
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
                    this.catchConfiguration(error);
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
                    this.catchConfiguration(error);
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }

    liberar() {
        if ( this.atendimento.getId() > 0 ) {
            this.atendimentoService.liberar( this.atendimento )
                .then( res => {
                    this.toastParams = ["Empregado liberado", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                } )
                .catch( error => {
                    this.catchConfiguration(error);
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }

    finalizar() {
        if ( this.atendimento.getId() > 0 ) {
            this.atendimentoService.finalizar( this.atendimento )
                .then( res => {
                    this.toastParams = ["Atendimento finalizado", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                } )
                .catch( error => {
                    this.catchConfiguration(error);
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
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
                    this.catchConfiguration(error);
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }
    
    finalizarPausar() {
        if ( this.atendimento.getId() > 0 ) {
            this.atendimentoService.finalizarPausar( this.atendimento )
                .then( res => {
                    this.toastParams = ["Atendimento finalizado", 4000];
                    this.globalActions.emit( 'toast' );
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                } )
                .catch( error => {
                	this.catchConfiguration(error);
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
    
    catchConfiguration( error ) {
        switch ( error.status ) {
            case 401:
                localStorage.clear();
                this.router.navigate(["login"]);
                break;
            }
    }

}