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
import { ItemRespostaFichaColeta } from './../../../model/item-resposta-ficha-coleta';
import { ItemRespostaFichaColetaBuilder } from './../../item-resposta-ficha-coleta/item-resposta-ficha-coleta.builder';
import { ItemPerguntaFichaColeta } from './../../../model/item-pergunta-ficha-coleta';
import { IndicadorSast } from './../../../model/indicador-sast';
import { RespostaFichaColeta } from './../../../model/resposta-ficha-coleta';
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
    
    statusesSimNao: Array<string>;
    statusSim: Array<boolean>;

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
        this.statusSim = Array<boolean>();
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
        this.getStatusSimNao();
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
                console.log( "Erro ao retornar as localizações." );
            } )
    }
    
    confirmarLocalizacao() {
        //verifico no openModalConfirmLocalizacao() se o id da localizacao eh maior que zero
        this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize( this.filaAtendimentoOcupacional );
        this.filaAtendimentoOcupacional.setProfissional( this.profissional );
        this.filaAtendimentoOcupacional.setLocalizacao( this.localizacao );
        this.atendimento.setFilaAtendimentoOcupacional(this.filaAtendimentoOcupacional);
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
            this.atendimento.setFilaAtendimentoOcupacional(this.filaAtendimentoOcupacional);
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
                    this.catchConfiguration(error);
                    this.filaAtendimentoOcupacional = undefined;
                    console.log( "Erro ao atualizar primeira vez: " + error );
                } )
        } else {
            console.log( "Profissional nao setado." )
        }
    }
    
    atualizar() {
        if ( this.atendimento != undefined ) {
            this.atendimentoService.atualizar( this.atendimento )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    console.log(this.atendimento);
                    
                    this.statusProfissional = this.atendimento.getFilaAtendimentoOcupacional().getStatus();
                    if ( this.atendimento.getId() > 0 ) {
                        this.localizacao = this.atendimento.getFilaAtendimentoOcupacional().getLocalizacao();
                        this.existLocalizacao = true;
                        this.setDataNascimento();

                        for( let i = 0; i < $(".tab").children().length; i++ ) {
                            if ( $(".tab").children()[0].className == "active" )
                                this.tabsActions.emit({action:"tabs", params:['select_tab', 'atendimento']});
                        }
                        
                        if ( this.atendimento.getFilaAtendimentoOcupacional().getStatus().length == 20) {
//                            this.audio.load();
//                            this.audio.play();
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
            
            if ( !this.verifyCompleteFichaColeta() ) {
                this.toastParams = ["Por favor, preencha os campos da Ficha de Coleta", 4000];
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
                    this.catchConfiguration(error);
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }

    finalizar() {
        if ( this.atendimento.getId() > 0 ) {
            
            if ( !this.verifyCompleteFichaColeta() ) {
                this.toastParams = ["Por favor, preencha os campos da Ficha de Coleta", 4000];
                this.globalActions.emit( 'toast' );
                return;
            }
            
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
            
            if ( !this.verifyCompleteFichaColeta() ) {
                this.toastParams = ["Por favor, preencha os campos da Ficha de Coleta", 4000];
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
                	this.catchConfiguration(error);
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }
    
    verifyCompleteFichaColeta() {
        if ( $(".resposta-conteudo:enabled").val() == "" )
            return false;
        return true;
        
    }
    
    verifyEquipe( resposta: RespostaFichaColeta ) {
        let e: Equipe = resposta.getPergunta().getEquipes().find(e => e.getId() == this.profissional.getEquipe().getId());
        
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
        let s:number = Math.floor(10 / itens.length);
        return "col s"+s.toString();
    }
    
    getGridItensResposta( itens: Array<ItemRespostaFichaColeta> ) {
        let s:number = Math.floor(10 / itens.length);
        return "col s"+s.toString();
    }
    
    getArrayItensResposta( item: ItemRespostaFichaColeta ) {
        let ret = [];
        
        while ( item != null && item != undefined ) {
            ret.push(item);
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
        if ( texto.includes("SIM") ) ret = "SIM";
        else if ( texto.includes("ANAMNESE") ) ret = "ANAMNESE";
        else if ( texto.includes("DOUBLE") ) ret = "DOUBLE";
        else if ( texto.includes("INTEIRO") ) ret = "INTEIRO";
        else if ( texto.includes("TEXTO") ) ret = "TEXTO";
        else if ( texto.includes("EXAME F") ) ret = "EXAMEF";
        else if ( texto.includes("EXAME ODONTOL") ) ret = "EXAMEODONTOL";
        else if ( texto.includes("BITOS ALIMENTARES") ) ret = "BITOSALIMENTARES";
        else if ( texto.includes("TESTE DE FAGERSTR") ) ret = "TESTEDEFAGERSTR";
        else if ( texto.includes("VEL DE ESTRESSE") ) ret = "VELDEESTRESSE";
        return ret;
    }
    
    selectStatusSimNao( itens, indexResposta, status ) {
        if ( status == "SIM" ) {
            this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()[indexResposta]
            .setItens([]);
            this.addItemResposta(itens, indexResposta);
            this.statusSim[indexResposta] = true;
        } else this.statusSim[indexResposta] = false;
    }
    
    addItemResposta( itens: Array<ItemPerguntaFichaColeta>, indexResposta ) {
        let quantidadeItens = itens.length;

        let itemRespostaFichaColeta: ItemRespostaFichaColeta = 
            new ItemRespostaFichaColetaBuilder().initialize(new ItemRespostaFichaColeta());
        
        this.constructItemRespostaFichaColeta( quantidadeItens, itemRespostaFichaColeta );
        
        this.atendimento.getFilaEsperaOcupacional().getFichaColeta().getRespostaFichaColetas()[indexResposta]
            .getItens().push(itemRespostaFichaColeta);
    }
    
    removeItemResposta(respostaIndex, itemIndex) {
        this.atendimento.getFilaEsperaOcupacional().
            getFichaColeta().getRespostaFichaColetas()[respostaIndex].getItens().splice(itemIndex, 1);
    }
    
    constructItemRespostaFichaColeta( quantidadeItens: number, itemRespostaFichaColeta: ItemRespostaFichaColeta ) {
        quantidadeItens--;
        if ( quantidadeItens == 1 ) return;
        
        let item: ItemRespostaFichaColeta = 
            new ItemRespostaFichaColetaBuilder().initialize(new ItemRespostaFichaColeta());
        
        itemRespostaFichaColeta.setItem(item);
        this.constructItemRespostaFichaColeta(quantidadeItens, item);
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