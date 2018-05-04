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
import { BaseFilter } from './../base/base.filter';
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
    private uf: string;
    private ufs: Array<string>;

    constructor( service: RiscoPotencialService, riscoGuard: RiscoPotencialGuard, router: Router ) {
        super( service, new RiscoPotencialFilter(), riscoGuard, router );

        this.riscoPotenciais = new RiscoPotencialBuilder().initializeList( new Array<RiscoPotencial>() );
        this.riscoPotencialDatas = new Array<any>();
        this.riscoPotencialRPSats = new Array<string>();
        this.uf = '';
        this.ufs = new Array<string>();

        this.servico = service;
    }

    ngOnInit() {
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
                                this.canImport = true;
                                this.showPreload = false;
                                if ( res.json().list[0] != undefined )
                                    this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                else {
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
            
        this.getUfs();
    }
    
    getUfs() {
        this.servico.getUfs()
            .then(res => {
                this.ufs = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao retornar ufs.");
            })
    }
    
    selectUf() {
        if ( this.uf != '' ) {
            this.showPreload = true;
            this.filter.setAtual( new BooleanFilter() );
            this.filter.getAtual().setValue( 1 );
            this.filter.setEmpregado(new EmpregadoFilter());
            this.filter.getEmpregado().setBase(new BaseFilter());
            this.filter.getEmpregado().getBase().setUf(this.uf);
            this.filter.setPageNumber(1);
            this.filter.setPageSize(Math.pow(2, 31)-1);
            this.servico.listAll( this.filter )
                .then( res => {
                    this.showPreload = false;
                    this.canImport = true;
                    this.array = JSON.parse( JSON.stringify( res.json() ) ).list;
                        if ( this.array != undefined ) {
                            this.riscoPotenciais = new RiscoPotencialBuilder().cloneList( this.array );
                
                            setTimeout(() => {
                                this.changeColorStatusRPSat();
                            }, 250 );   
                        }
                    } )
                    .catch( error => {
                        this.showPreload = false;
                        this.canImport = false;
                        this.catchConfiguration( error );
                    } );
    
            this.parseAndSetDates();
        } else {
            this.toastParams = ['Por favor, selecione um UF', 4000];
            this.globalActions.emit( 'toast' );
        }
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
        if ( this.riscoPotenciais[indexRisco].getStatus() == "PLANEJAMENTO" && 
                this.riscoPotenciais[indexRisco].getAbreviacaoEquipeAcolhimento() == this.profissional.getEquipe().getAbreviacao() )
            return true;
        return false;
    }

    verifyStatusCriarPlano( indexRisco ) {
        if ( this.riscoPotenciais[indexRisco].getStatus() == "ABERTO" && 
                this.riscoPotenciais[indexRisco].getAbreviacaoEquipeAcolhimento() == this.profissional.getEquipe().getAbreviacao() )
            return true;
        return false;
    }
    
    verifyStatusAcompanhamento( indexRisco ) {
        if ( this.riscoPotenciais[indexRisco].getStatus() == "VALIDADO" )
            return true;
        return false;
    }

}
