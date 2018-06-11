import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { Empregado } from './../../model/empregado';
import { EmpregadoFilter } from './../../controller/empregado/empregado.filter';
import { EmpregadoBuilder } from './../../controller/empregado/empregado.builder';
import { GerenciaFilter } from './../../controller/gerencia/gerencia.filter';
import { PessoaFilter } from './../../controller/pessoa/pessoa.filter';
import { DateFilter } from './../../generics/date.filter';
import { TypeFilter } from './../../generics/type.filter';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { Tarefa } from './../../model/tarefa';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { Servico } from './../../model/servico';
import { ServicoFilter } from './../../controller/servico/servico.filter';
import { ServicoBuilder } from './../../controller/servico/servico.builder';
import { Usuario } from './../../model/usuario';
import { UsuarioBuilder } from './../../controller/usuario/usuario.builder';
import { BooleanFilter } from './../../generics/boolean.filter';
import { EmpregadoNomeAutocomplete } from './../../controller/empregado/empregado-nome.autocomplete';

@Component( {
    selector: 'app-selecao-servico',
    templateUrl: './selecao-servico.html',
    styleUrls: ['./selecao-servico.css']
} )
export class SelecaoServicoComponent implements OnInit {
    globalActions;
    toastParams;
    tarefa: Tarefa;
    empregado: Empregado;
    servicos: Array<Servico>;
    usuario: Usuario;
    canChangeEmpregado: boolean;
    empregados: Array<Empregado>;
    private autoCompleteEmp:EmpregadoNomeAutocomplete;

    constructor( private route: ActivatedRoute, private router: Router,
        private solicitacaoServicoService: SolicitacaoServicoService ) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.tarefa = new TarefaBuilder().initialize( this.tarefa );
        this.servicos = new Array<Servico>();
        this.canChangeEmpregado = false;
        this.empregados = new Array<Empregado>();
        this.autoCompleteEmp = new EmpregadoNomeAutocomplete(this.solicitacaoServicoService.getEmpregadoService());
    }

    ngOnInit() {
        if ( localStorage.getItem( "empregado" ) == undefined )
            this.router.navigate( ["/solicitacao-servico/autenticacao-usuario"] );
        else {
            this.empregado = new EmpregadoBuilder().clone( JSON.parse( localStorage.getItem( "empregado" ) ) );
            localStorage.removeItem( "empregado" );
        }
        
        this.tarefa.setCliente( this.empregado );

        let servicoFilter: ServicoFilter = new ServicoFilter();

        if ( localStorage.getItem( "usuario" ) != undefined ) {
            this.usuario = new UsuarioBuilder().clone( JSON.parse( localStorage.getItem( "usuario" ) ) );
            localStorage.removeItem( "usuario" );
            
            let gerenciaFilter: GerenciaFilter = new GerenciaFilter();
            gerenciaFilter.setSecretario1(new EmpregadoFilter());
            gerenciaFilter.getSecretario1().setMatricula( this.empregado.getMatricula() );
            
            this.solicitacaoServicoService.getGerencia( gerenciaFilter )
                .then( res => {
                    if ( res.json().list[0] != undefined )
                        this.canChangeEmpregado = true;
                    else {
                        gerenciaFilter = new GerenciaFilter();
                        gerenciaFilter.setSecretario2(new EmpregadoFilter());
                        gerenciaFilter.getSecretario2().setMatricula( this.empregado.getMatricula() );
    
                        this.solicitacaoServicoService.getGerencia( gerenciaFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined )
                                    this.canChangeEmpregado = true;
                                else {
                                    gerenciaFilter = new GerenciaFilter();
                                    gerenciaFilter.setGerente(new EmpregadoFilter());
                                    gerenciaFilter.getGerente().setMatricula( this.empregado.getMatricula() );
                                    this.autoCompleteEmp.getAutocomplete().initializeLastValue(this.tarefa
                                            .getCliente().getPessoa().getNome());
    
                                    this.solicitacaoServicoService.getGerencia( gerenciaFilter )
                                        .then( res => {
                                            if ( res.json().list[0] != undefined )
                                                this.canChangeEmpregado = true;
                                        } )
                                        .catch( error => {
                                            console.log( "Erro no servidor ao buscar gerencia" );
                                        } )
                                }
                            } )
                            .catch( error => {
                                console.log( "Erro no servidor ao buscar secretario 2" );
                            } )
                    }
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar secretario 1" );
                } )

            if ( this.usuario.getGestorCss() == true ) {

                this.getServicos( new ServicoFilter() );
                this.canChangeEmpregado = true;
            }
        }else{
            let booleanFilter: BooleanFilter = new BooleanFilter();
            booleanFilter.setValue( 1 );
            servicoFilter.setPublico( booleanFilter );
        }
        
        this.getServicos(servicoFilter);
    }
    
    getServicos( servicoFilter ) {
        if ( servicoFilter == undefined ) 
            servicoFilter = new ServicoFilter();
        
        this.solicitacaoServicoService.getServicos( servicoFilter )
            .then( res => {
                this.servicos = new ServicoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( "Erro no servidor." );
            } )        
    }
    
//    getEmpregado( evento ) {
//        if ( this.empregadoToChange !== undefined ) {
//            let empregado: Empregado = this.empregados.find( e => {
//                    if ( ( e.getChave() + " - " + e.getPessoa().getNome() ).trim() ==
//                        this.empregadoToChange.getPessoa().getNome().trim() || 
//                        e.getPessoa().getNome().trim() == this.empregadoToChange.getPessoa().getNome().trim() )
//                        return true;
//                    else return false;
//                });
//            
//            if ( empregado !== undefined ) {
//                this.empregadoToChange = new EmpregadoBuilder().clone(empregado);
//            } else this.empregadoToChange = new EmpregadoBuilder().initialize( this.empregadoToChange );
//        } else this.empregadoToChange = new EmpregadoBuilder().initialize( this.empregadoToChange );
//    }
//    
//    private oldNomeEmpregado: string;
//    selectEmpregado( evento: string ) {
//        if ( this.oldNomeEmpregado != evento ) {
//            this.oldNomeEmpregado = evento;
//            if ( evento.length > 4 ) {
//                let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
//                empregadoFilter.getPessoa().setNome(evento);
//                
//                if ( !this.usuario.getGestorCss() ) {
//                    empregadoFilter.setGerencia(new GerenciaFilter());
//                    empregadoFilter.getGerencia().setCodigoCompleto( this.empregado.getGerencia().getCodigoCompleto() )
//                }
//                
//                this.solicitacaoServicoService.getEmpregado( empregadoFilter )
//                    .then( res => {
//                        this.empregados = new EmpregadoBuilder().cloneList( res.json().list ); 
//                        this.autocompleteEmpregado = [this.buildAutocompleteEmpregado( this.empregados )];
//                    } )
//                    .catch( error => {
//                        console.log( error );
//                    } )
//            }
//        }
//    }
//    
//    private oldNomeByChave: string;
//    selectEmpregadoByChave( evento ) {
//        if ( this.oldNomeByChave != evento ) {
//            this.oldNomeByChave = evento;
//            
//            let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
//            empregadoFilter.setChave(evento);
//            
//            if ( !this.usuario.getGestorCss() ) {
//                empregadoFilter.setGerencia(new GerenciaFilter());
//                empregadoFilter.getGerencia().setCodigoCompleto( this.empregado.getGerencia().getCodigoCompleto() )
//            }
//            
//            this.solicitacaoServicoService.getEmpregadoByChave( empregadoFilter )
//                .then( res => {
//                    this.empregados = new EmpregadoBuilder().cloneList( res.json() ); 
//                    this.autocompleteEmpregado = [this.buildAutocompleteEmpregado( this.empregados )];
//                } )
//                .catch( error => {
//                    console.log( error );
//                } )
//        }
//    }
//    
//    buildAutocompleteEmpregado( empregados: Array<Empregado> ) {
//        let data = {};
//        empregados.forEach( item => {
//            data[item.getChave() + " - " + item.getPessoa().getNome()] = null;
//        } );
//
//        let array = {};
//        array["data"] = data;
//
//        return array;
//    }

    next( id ) {
        if ( id == 0 ) {
            this.toastParams = ['Por favor, seleciona um servico', 4000];
            this.globalActions.emit( 'toast' );
            return;
        } else {
            if ( this.canChangeEmpregado == true ) {
                if ( this.tarefa.getCliente() == undefined && this.tarefa.getCliente().getId() <= 0 ) {
                    this.toastParams = ['Por favor, seleciona um empregado corretamente', 4000];
                    this.globalActions.emit( 'toast' );
                    return;
                }
            }
            let servico: Servico = this.servicos.find( f => f.getId() == id );
            this.tarefa.setServico(servico);
            localStorage.setItem("tarefa", JSON.stringify(this.tarefa));
            this.router.navigate(["/solicitacao-servico/" + this.tarefa.getServico().getUrl()]);
        }
    }
    
    ngOnDestroy() {
        if ( localStorage.getItem("empregado") != undefined )
            localStorage.removeItem("empregado");
        if ( localStorage.getItem("usuario") != undefined )
            localStorage.removeItem("usuario");
    }

}