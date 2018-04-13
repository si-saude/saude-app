import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';
import * as $ from 'jquery';

import { RiscoPotencial } from './../../model/risco-potencial';
import { RiscoPotencialService } from './risco-potencial.service';
import { RiscoPotencialFilter } from './risco-potencial.filter';
import { RiscoPotencialBuilder } from './risco-potencial.builder';
import { RiscoPotencialGuard } from './../../guards/guards-child/risco-potencial.guard';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { GenericListComponent } from './../../generics/generic.list.component';
import { BooleanFilter } from './../../generics/boolean.filter';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../profissional-saude/profissional-saude.filter';
import { Profissional } from './../../model/profissional';
import { Usuario } from './../../model/usuario';
import { UsuarioBuilder } from './../usuario/usuario.builder';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { PessoaFilter } from './../pessoa/pessoa.filter';

@Component( {
    selector: 'app-risco-potencial',
    templateUrl: './risco-potencial.component.html',
    styleUrls: ['./risco-potencial.component.css', '../../../assets/css/list-component.css']
} )
export class RiscoPotencialComponent extends GenericListComponent<RiscoPotencial, RiscoPotencialFilter, RiscoPotencialGuard> {
    private riscoPotenciais: Array<RiscoPotencial>;
    private riscoPotencialDatas: Array<any>;
    private riscoPotencialRPSats: Array<string>;
    private empregado;
    private equipe;
    private profissional: Profissional;
    private servico: RiscoPotencialService;

    constructor( service: RiscoPotencialService, riscoGuard: RiscoPotencialGuard, router: Router ) {
        super( service, new RiscoPotencialFilter(), riscoGuard, router );

        this.riscoPotenciais = new RiscoPotencialBuilder().initializeList( new Array<RiscoPotencial>() );
        this.riscoPotencialDatas = new Array<any>();
        this.riscoPotencialRPSats = new Array<string>();

        this.servico = service;
    }

    ngOnInit() {

        this.listar();

        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            this.servico.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    let usuario: Usuario = new Usuario();
                    usuario = new UsuarioBuilder().clone( res.json() );
                    if ( usuario.getId() > 0 && usuario.getPessoa() != undefined ) {
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( new EmpregadoFilter() );
                        profissionalFilter.getEmpregado().setPessoa( new PessoaFilter() );
                        profissionalFilter.getEmpregado().getPessoa().setCpf( usuario.getPessoa().getCpf() );

                        this.servico.getProfissional( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                    
                                    setTimeout(() => {
                                        this.canRemove = this.guard.canRemove;
                                    }, 200 );

                                    setTimeout(() => {
                                        if ( this.array != undefined ) {
                                            this.riscoPotenciais = new RiscoPotencialBuilder().cloneList( this.array );

                                            setTimeout(() => {
                                                this.changeColorStatusRPSat();
                                            }, 200 );

                                            this.parseAndSetDates();
                                        }
                                    }, 500 );

                                } else {
                                    this.router.navigate( ["/login"] );
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

    }

    listar() {
        this.showPreload = true;
        this.filter.setAtual( new BooleanFilter() );
        this.filter.getAtual().setValue( 1 );
        this.servico.listAll( this.filter )
            .then( res => {
                this.canImport = true;
                this.showPreload = false;
                this.array = JSON.parse( JSON.stringify( res.json() ) ).list;
                this.paginas = this.getPaginas( res.json().total );
                this.paginator();
                if ( res.json().total === 0 ) {
                    this.verifyEmptyPaginas = true;
                } else {
                    this.verifyEmptyPaginas = false;
                }
            } )
            .catch( error => {
                this.showPreload = false;
                this.canImport = false;
                this.catchConfiguration( error );
            } )
    }

    changeColorStatusRPSat() {
        for ( let i = 0; i < this.riscoPotenciais.length; i++ ) {
            if ( this.riscoPotenciais[i].getStatusRPSat() != undefined ) {
                if ( this.riscoPotenciais[i].getStatusRPSat().includes( "IN" ) )
                    $( ".row-risco" + i ).css( "background-color", "red" );
                else if ( this.riscoPotenciais[i].getStatusRPSat().includes( "TOLER" ) )
                    $( ".row-risco" + i ).css( "background-color", "yellow" );
                else $( ".row-risco" + i ).css( "background-color", "green" );
            }
        }
    }

    parseAndSetDates() {
        for ( let i = 0; i < this.riscoPotenciais.length; i++ ) {
            if ( this.riscoPotenciais[i].getData() != null ) {
                this.riscoPotencialDatas[i] =
                    this.parseDataToObjectDatePicker(
                        this.riscoPotenciais[i].getData() );
            }
        }
    }

    toggleButtons( indexRisco: number ) {
        $( ".row-btns-risco" + indexRisco ).toggle( "slow" );
    }

    verifyPlanejamento( indexRisco ) {
        if ( this.riscoPotenciais[indexRisco].getStatus() == "PLANEJAMENTO" )
            return true;
        return false;
    }
    
    verifyStatusAcao( indexRisco ) {
        if ( this.riscoPotenciais[indexRisco].getStatus() == "VALIDADO" &&
            this.riscoPotenciais[indexRisco].getEquipeResponsavel().getId() == this.profissional.getEquipe().getId() )
            return true;
        return false;
    }

    verifyStatusPlanoIntervencao( indexRisco ) {
        if ( this.riscoPotenciais[indexRisco].getStatus() == "PLANEJAMENTO" )
            return true;
        return false;
    }

    verifyStatusCriarPlano( indexRisco ) {
        if ( this.riscoPotenciais[indexRisco].getStatus() == "ABERTO" )
            return true;
        return false;
    }
    
    verifyStatusAcompanhamento( indexRisco ) {
        if ( this.riscoPotenciais[indexRisco].getStatus() == "VALIDADO" )
            return true;
        return false;
    }

}
