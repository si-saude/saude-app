import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';

import { Empregado } from './../../model/empregado/';
import { EmpregadoFilter } from './../../controller/empregado/empregado.filter';
import { EmpregadoBuilder } from './../../controller/empregado/empregado.builder';
import { PessoaFilter } from './../../controller/pessoa/pessoa.filter';
import { DateFilter } from './../../generics/date.filter';
import { TypeFilter } from './../../generics/type.filter';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { Tarefa } from './../../model/tarefa';
import { Usuario } from './../../model/usuario';
import { UsuarioBuilder } from './../../controller/usuario/usuario.builder';
import { Pessoa } from './../../model/pessoa';
import { PessoaBuilder } from './../../controller/pessoa/pessoa.builder';

@Component( {
    selector: 'app-autenticacao-usuario',
    templateUrl: './autenticacao-usuario.html',
    styleUrls: ['./autenticacao-usuario.css']
} )
export class AutenticacaoUsuarioComponent {
    cpf: string;
    matricula: string;
    chave: string;
    dataNascimento: any;
    globalActions;
    toastParams;
    tarefa: Tarefa;
    usuario: Usuario;
    pessoa: Pessoa;
    empregado: Empregado;
    myDatePickerOptions: IMyDpOptions;

    constructor( private route: ActivatedRoute, private router: Router,
        private solicitacaoServicoService: SolicitacaoServicoService ) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.myDatePickerOptions = {
                dateFormat: 'dd/mm/yyyy'
            };
    }

    ngOnInit() {

        if ( localStorage.getItem( 'usuario-id' ) != undefined ) {

            this.solicitacaoServicoService.getUsuario( Number( localStorage.getItem( 'usuario-id' ) ) )
                .then( res => {
                    this.usuario = new UsuarioBuilder().clone( res.json() );
                    localStorage.setItem("usuario", JSON.stringify( this.usuario ));
                    
                    if ( this.usuario.getId() > 0 ) {
                        let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
                        empregadoFilter.getPessoa().setCpf( this.usuario.getPessoa().getCpf() );

                        this.solicitacaoServicoService.getEmpregado( empregadoFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    this.empregado = new EmpregadoBuilder().clone( res.json().list[0] );
                                    localStorage.setItem( "empregado", JSON.stringify( this.empregado ) );
                                    this.router.navigate( ["/solicitacao-servico/selecao-servico"] );
                                }
                            } )
                            .catch( error => {
                                console.log( "Erro no servidor ao buscar o empregado." );
                            } )
                    }
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario." );
                } )
        }

    }

    next() {
        let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
        let pessoaFilter: PessoaFilter = new PessoaFilter();
        let dateFilter: DateFilter = new DateFilter();
        let tarefa: Tarefa = new Tarefa();

        if ( ( this.cpf && this.matricula && this.chave && this.dataNascimento ) == undefined ||
            ( this.cpf && this.matricula && this.chave && this.dataNascimento ) == "" ) {
            this.toastParams = ['Por favor, preencha todos os campos', 4000];
            this.globalActions.emit( 'toast' );
            return;
        }

        let data: Date = this.parseDatePickerToDate( this.dataNascimento );

        pessoaFilter.setCpf( this.cpf );
        dateFilter.setInicio( data );
        dateFilter.setTypeFilter( "IGUAL" );
        pessoaFilter.setDataNascimento( dateFilter );

        empregadoFilter.setPessoa( pessoaFilter );
        empregadoFilter.setChave( this.chave )
        empregadoFilter.setMatricula( this.matricula );

        this.solicitacaoServicoService.getEmpregado( empregadoFilter )
            .then( res => {
                if ( res.json().list[0] != undefined ) {
                    localStorage.setItem( "empregado", JSON.stringify( res.json().list[0] ) );
                    this.router.navigate( ["/solicitacao-servico/selecao-servico"] );
                } else {
                    this.toastParams = ['Dados informados incorretamente ou empregado inexistente', 4000];
                    this.globalActions.emit( 'toast' );
                }
            } )
            .catch( error => {
                console.log( "Erro no servidor." );
            } )
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
}