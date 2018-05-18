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
import { Equipe } from './../../model/equipe';
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
import { FilterDataPipe } from './../../pipes/filter-data.pipe';

@Component( {
    selector: 'app-risco-potencial',
    templateUrl: './risco-potencial.component.html',
    styleUrls: ['./risco-potencial.component.css', '../../../assets/css/list-component.css']
} )
export class RiscoPotencialComponent extends GenericListComponent<RiscoPotencial, RiscoPotencialFilter, RiscoPotencialGuard> {
    private riscoPotenciais: Array<RiscoPotencial>;
    private flagRiscoPotenciais: Array<RiscoPotencial>;
    private riscoPotencialDatas: Array<any>;
    private riscoPotencialRPSats: Array<string>;
    private equipes: Array<Equipe>;
    private statuses: Array<string>;
    private rpsats: Array<string>;
    private empregado;
    private equipe;
    private profissional: Profissional;
    private servico: RiscoPotencialService;
    private uf: string;
    private ufs: Array<string>;
    private filtro: string;
    private instantTypeFiltro: string;

    constructor( service: RiscoPotencialService, riscoGuard: RiscoPotencialGuard, router: Router ) {
        super( service, new RiscoPotencialFilter(), riscoGuard, router );
        this.riscoPotenciais = new RiscoPotencialBuilder().initializeList( new Array<RiscoPotencial>() );
        this.flagRiscoPotenciais = new RiscoPotencialBuilder().initializeList( new Array<RiscoPotencial>() );
        this.riscoPotencialDatas = new Array<any>();
        this.riscoPotencialRPSats = new Array<string>();
        this.uf = '';
        this.ufs = new Array<string>();
        this.servico = service;
        this.equipes = new EquipeBuilder().initializeList(new Array<Equipe>());
        this.statuses = new Array<string>();
        this.instantTypeFiltro = '';
        this.filtro = '';
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
        this.getEquipes();
        this.getStatus();
        this.getRPSats();
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
    
    getStatus() {
        this.servico.getStatusRiscoPotencial( )
            .then( res => {
                this.statuses = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getRPSats() {
        this.servico.getStatusRPSat()
            .then( res => {
                this.rpsats = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getEquipes() {
        this.servico.getEquipes()
            .then( res => {
                this.equipes = new EquipeBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    selectFilterData( filtro ) {
        if ( this.setInstantTypeFiltro( filtro, 'data' ) ) return;
        
        let component = this;
        this.flagRiscoPotenciais = new RiscoPotencialBuilder().initializeList( new Array<RiscoPotencial>() );
        
        this.flagRiscoPotenciais = this.riscoPotenciais.filter(rP =>
            rP[this.instantTypeFiltro] != undefined && 
                component.transformDate( rP[this.instantTypeFiltro] ).includes( filtro.target.value )
        )
    }
    
    selectFilterRPSat( filtro ) {
        if ( this.setInstantTypeFiltro( filtro, 'statusRPSat' ) ) return;
        
        let component = this;
        this.flagRiscoPotenciais = new RiscoPotencialBuilder().initializeList( new Array<RiscoPotencial>() );
    }
    
    selectFilterEquipe( filtro ) {
        if ( this.setInstantTypeFiltro( filtro, 'equipeResponsavel' ) ) return;
        
        let component = this;
        this.flagRiscoPotenciais = new RiscoPotencialBuilder().initializeList( new Array<RiscoPotencial>() );
        
        this.flagRiscoPotenciais = this.riscoPotenciais.filter(rP => {
            if ( rP[this.instantTypeFiltro]['nome'] != undefined && 
                rP[this.instantTypeFiltro]['nome'].includes( filtro.target.value ) )
                return true;
            else return false;
        })
        
    }
    
    selectFilterEmpregado( filtro ) {
        if ( this.setInstantTypeFiltro( filtro, 'empregado' ) ) return;
        
        let component = this;
        this.flagRiscoPotenciais = new RiscoPotencialBuilder().initializeList( new Array<RiscoPotencial>() );
        
        this.flagRiscoPotenciais = this.riscoPotenciais.filter(rP => {
            if ( rP[this.instantTypeFiltro]['pessoa']['nome'] != undefined && 
                rP[this.instantTypeFiltro]['pessoa']['nome'].includes( filtro.target.value ) )
                return true;
            else return false;
        })
    }
    
    selectFilterStatus( filtro ) {
        if ( this.setInstantTypeFiltro( filtro, 'status' ) ) return; 
        
        let component = this;
        this.flagRiscoPotenciais = new RiscoPotencialBuilder().initializeList( new Array<RiscoPotencial>() );
        
        this.flagRiscoPotenciais = this.riscoPotenciais.filter(rP => 
                rP[this.instantTypeFiltro] != undefined && rP[this.instantTypeFiltro].includes( filtro.target.value ) 
        )
        
    }
    
    setInstantTypeFiltro( filtro, tipo ) {
        if ( filtro.target.value == '' ) {
            this.instantTypeFiltro = '';
            this.flagRiscoPotenciais = this.riscoPotenciais;
            return true;
        }
        else 
            this.instantTypeFiltro = tipo;
        
        return false;
    }
    
    verifyFiltro( tipo ) {
        if ( this.instantTypeFiltro == '' )
            return false;
        else if ( this.instantTypeFiltro == tipo ) 
            return false;
        else return true;
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
                            for ( let i = 0; i < this.riscoPotenciais.length; i++)
                                this.riscoPotenciais[i].setRanking(i+1)
                                
                            this.flagRiscoPotenciais = this.riscoPotenciais;
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

    changeColorStatusRPSat( campo ) {
        if ( campo != undefined ) {
            if ( campo.includes( "IN" ) )
                return {'background-color':'red'};
            else if ( campo.includes( "TOLER" ) )
                return {'background-color':'yellow'};
            else return {'background-color':'green'};
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
    
    transformDate( value: Date ): string {
        let date: string;
        let arrayDate: Array<string>;
        date = value.toString();
        arrayDate = date.split('T');
        arrayDate = arrayDate[0].split('-');
        date = arrayDate[2] + '/' + arrayDate[1] + '/' + arrayDate[0];
        return date;
    }

}
