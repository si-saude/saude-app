import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/Rx';
import { MyDatePickerModule } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';

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
    private localizacoes: Array<Localizacao>;
    private localizacao: Localizacao;
    private selectedLocalizacao: boolean;
    private filaAtendimentoOcupacionais: Array<FilaAtendimentoOcupacional>;
    private filaAtendimentoOcupacional: FilaAtendimentoOcupacional;
    private alive: boolean;
    private dataNascimento: any;
    private idade: number;
    private myDatePickerOptions: IMyDpOptions;
    private localizacaoId: number;

    constructor( private route: ActivatedRoute, private router: Router,
        private atendimentoService: AtendimentoService ) {
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.atendimento = new AtendimentoBuilder().initialize( this.atendimento );
        this.atendimentos = new AtendimentoBuilder().initializeList( this.atendimentos );
        this.filaAtendimentoOcupacionais = new FilaAtendimentoOcupacionalBuilder().
            initializeList( this.filaAtendimentoOcupacionais );
        this.alive = true;
        this.myDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy'
        };
        this.localizacaoId = 0;
    }

    ngOnInit() {
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            this.atendimentoService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    this.usuario = new UsuarioBuilder().clone( res.json() );
                    if ( this.usuario.getId() > 0 ) {
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

                                    this.primeiraAtualizacao();

                                    this.inscricao = TimerObservable.create( 0, 5000 )
                                        .takeWhile(() => this.alive )
                                        .subscribe(() => {
                                            this.atualizar();
                                            this.atualizarLista();
                                        } );
                                } else {
                                    console.log( "Profissional nao é medico." );
                                    //ENVIAR CONFIRM BOX INFOMANDO O USUARIO DEPOIS ENVIA-LO PARA TELA DE INICIO
                                    this.router.navigate( ["/home"] );
                                    return;
                                }
                            } )
                            .catch( error => {
                                console.log( "Erro no servidor ao buscar o profissional. Tentar mais tarde." );
                            } )
                    } else {
                        this.router.navigate( ["/login"] );
                        return;
                    }
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario." );
                    //ENVIAR CONFIRM BOX DE ERRO - NAVEGA PARA TELA INICIAL
                } )
        } else {
            console.log( "Usuario nao logada." );
            // ENVIAR CONFIRM BOX PARA USUARIO INFORMANDO E DEPOIS ENVIA-LO PARA TELA DE LOGIN
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

    setLocalizacao( localizacaoId ) {
        this.localizacao = this.localizacoes.find( l => l.getId() == localizacaoId );
        this.selectedLocalizacao = true;
        this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize( this.filaAtendimentoOcupacional );
        this.filaAtendimentoOcupacional.setProfissional( this.profissional );
        this.filaAtendimentoOcupacional.setLocalizacao( this.localizacao );
    }

    primeiraAtualizacao() {
        if ( this.profissional != undefined ) {
            this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize( this.filaAtendimentoOcupacional );
            this.filaAtendimentoOcupacional.setProfissional( this.profissional );
            this.atendimentoService.atualizar( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                    if ( this.atendimento.getFilaAtendimentoOcupacional() != undefined ) {
                        this.localizacao = this.atendimento.getFilaAtendimentoOcupacional().getLocalizacao();
                        this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize( this.filaAtendimentoOcupacional );
                        this.filaAtendimentoOcupacional.setProfissional( this.profissional );
                        this.filaAtendimentoOcupacional.setLocalizacao( this.localizacao );
                        this.selectedLocalizacao = true;
                    } else {
                        this.filaAtendimentoOcupacional = undefined;
                        console.log( this.atendimento );
                    }
                } )
                .catch( error => {
                    this.filaAtendimentoOcupacional = undefined;
                    this.selectedLocalizacao = false;
                    console.log( "Erro ao atualizar primeira vez: " + error.text() );
                } )
        } else {
            //ENVIAR MSN DE ERRO AO USUARIO
            console.log( "Profissional nao setado." )
        }
    }

    atualizarLista() {
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.atendimentoService.atualizarLista( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                } )
                .catch( error => {
                    console.log( "Erro ao atualizar lista: " + error.text() );
                } )
        } else {
            //ENVIAR MSN DE ERRO AO USUARIO
            console.log( "Fila de atendimento nao preenchida." )
        }
    }

    atualizar() {
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.atendimentoService.atualizar( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                } )
                .catch( error => {
                    console.log( "Erro ao atualizar: " + error.text() );
                } )
        } else {
            //ENVIAR MSN DE ERRO AO USUARIO
            console.log( "Fila de atendimento nao preenchida." )
        }
    }

    entrar() {
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.atendimentoService.entrar( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                } )
                .catch( error => {
                    console.log( "Erro ao entrar:" + error.text() );
                } )
        } else {
            //ENVIAR MSN DE ERRO AO USUARIO
            console.log( "Fila de atendimento nao preenchida." )
        }
    }

    pausar() {
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.atendimentoService.pausar( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                    console.log( this.atendimentos );
                } )
                .catch( error => {
                    console.log( "Erro ao pausar." );
                } )
        } else {
            //ENVIAR MSN DE ERRO AO USUARIO
            console.log( "Fila de atendimento nao preenchida." )
        }
    }

    almoco() {
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.atendimentoService.almoco( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                } )
                .catch( error => {
                    console.log( "Erro ao registrar almoco." );
                } )
        } else {
            //ENVIAR MSN DE ERRO AO USUARIO
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
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                    this.alive = false;
                } )
                .catch( error => {
                    console.log( "Erro ao encerrar." );
                } )
        } else {
            //ENVIAR MSN DE ERRO AO USUARIO
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
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                } )
                .catch( error => {
                    console.log( "Erro ao encerrar." );
                } )
        } else {
            //ENVIAR MSN DE ERRO AO USUARIO
            console.log( "Fila de atendimento nao preenchida." )
        }
    }

    iniciar() {
        if ( this.atendimento.getId() > 0 ) {
            this.atendimentoService.iniciar( this.atendimento )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                } )
                .catch( error => {
                    console.log( "Erro ao iniciar." );
                } )
        }
    }

    registrarAusencia() {
        if ( this.atendimento.getId() > 0 ) {
            this.atendimentoService.registrarAusencia( this.atendimento )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                } )
                .catch( error => {
                    console.log( "Erro ao registrar ausencia." );
                } )
        }
    }

    liberar() {
        if ( this.atendimento.getId() > 0 ) {
            this.atendimentoService.liberar( this.atendimento )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                } )
                .catch( error => {
                    console.log( "Erro ao liberar." );
                } )
        }
    }

    finalizar() {
        if ( this.atendimento.getId() > 0 ) {
            this.atendimentoService.finalizar( this.atendimento )
                .then( res => {
                    this.atendimento = new AtendimentoBuilder().clone( res.json() );
                } )
                .catch( error => {
                    console.log( "Erro ao finalizar." );
                } )
        }
    }

    ngOnDestroy() {
        this.alive = false;
        this.inscricao.unsubscribe();
    }

    calculateAge( birthday: Date ) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date( ageDifMs );
        return Math.abs( ageDate.getUTCFullYear() - 1970 );
    }
    
    setIdadeAndDataNascimento() {
        if ( this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getDataNascimento() != undefined ) {
            let data: Date = this.parseDateJavaToDateJS( this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getDataNascimento() );
            this.idade = this.calculateAge( data );
            this.dataNascimento = this.parseDataToObjectDatePicker( this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getDataNascimento() );
        } else {
            this.idade = 0;
            this.dataNascimento = null;
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

}