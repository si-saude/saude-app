import { Component, EventEmitter, OnInit } from '@angular/core';

import { GlobalVariable } from './../../global';
import { Empregado } from './../../model/empregado';
import { Cargo } from './../../model/cargo';
import { Funcao } from './../../model/funcao';
import { Gerencia } from './../../model/gerencia';
import { Base } from './../../model/base';
import { Ghe } from './../../model/ghe';
import { Ghee } from './../../model/ghee';
import { EmpregadoService } from './empregado.service';
import { EmpregadoFilter } from './empregado.filter';
import { EmpregadoGuard } from './../../guards/guards-child/empregado.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-empregado',
    templateUrl: './empregado.component.html',
    styleUrls: ['./empregado.component.css', '../../../assets/css/list-component.css']
} )
export class EmpregadoComponent extends GenericListComponent<Empregado, EmpregadoFilter, EmpregadoGuard> {
    vinculos: Array<string>;
    statuses: Array<string>;
    escolaridades: Array<string>;
    cargos: Array<Cargo>;
    funcoes: Array<Funcao>;
    regimes: Array<string>;
    gerencias: Array<Gerencia>;
    bases: Array<Base>;
    ghes: Array<Ghe>;
    ghees: Array<Ghee>;

    constructor( private empregadoService: EmpregadoService, empregadoGuard: EmpregadoGuard ) {
        super( empregadoService, new EmpregadoFilter(), empregadoGuard );
    }

    openModal() {
        this.getStatuses();
        this.getEscolaridades();
        this.getVinculos();
        this.getCargos();        
        this.getFuncoes();
        this.getRegimes();
        this.getGerencias();
        this.getBases();
        this.getGhes(); 
        this.getGhees();
        super.openModal();
    }
    
    getStatuses() {
        this.empregadoService.getStatuses()
            .then( res => {
                this.statuses = Object.keys( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )        
    }

    getEscolaridades() {
        this.empregadoService.getEscolaridades()
            .then( res => {
                this.escolaridades = Object.keys( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )        
    }

    
    getVinculos() {
        this.empregadoService.getVinculos()
            .then( res => {
                this.vinculos = Object.keys( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )        
    }

    getCargos() {
        this.empregadoService.getCargos()
            .then( res => {
                this.cargos = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )        
    }

    
    getFuncoes() {
        this.empregadoService.getFuncoes()
            .then( res => {
                this.funcoes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )        
    }

    getRegimes() {
        this.empregadoService.getRegimes()
            .then( res => {
                this.regimes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )        
    }

    getGerencias() {
        this.empregadoService.getGerencias()
            .then( res => {
                this.gerencias = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )        
    }

    getBases() {
        this.empregadoService.getBases()
            .then( res => {
                this.bases = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )        
    }

    getGhes() {
        this.empregadoService.getGhes()
            .then( res => {
                this.ghes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )        
    }

    getGhees() {
        this.empregadoService.getGhees()
            .then( res => {
                this.ghees = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )        
    }

    initializeFilterDate() {
        if ( this.filter.getPessoa().getDataNascimento().getInicio() !== null && 
            this.filter.getPessoa().getDataNascimento().getInicio() !== undefined ) {
            this.filter.getPessoa().getDataNascimento().setInicio(
                this.parseDatePickerToDate( this.filter.getPessoa().getDataNascimento().getInicio() ) );
        }

        if ( this.filter.getPessoa().getDataNascimento().getFim() !== null &&
            this.filter.getPessoa().getDataNascimento().getFim() !== undefined ) {
            this.filter.getPessoa().getDataNascimento().setFim(
                this.parseDatePickerToDate( this.filter.getPessoa().getDataNascimento().getFim() ) );
        }
    }

    setFilter() {
        this.initializeFilterDate();
        super.setFilter();
    }

}