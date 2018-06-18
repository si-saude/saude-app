import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Gerencia } from './../../../model/gerencia';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { EmpregadoService } from './../../empregado/empregado.service';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { GerenciaBuilder } from './../gerencia.builder';
import { GerenciaService } from './../gerencia.service';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';

@Component( {
    selector: 'app-gerencia-form',
    templateUrl: './gerencia-form.html',
    styleUrls: ['./gerencia-form.css', './../../../../assets/css/form-component.css', './../../../../assets/css/checkbox.css']
} )
export class GerenciaFormComponent extends GenericFormComponent implements OnInit {
    gerencia: Gerencia;
    gerencias: Array<Gerencia>;

    autoCompleteGerente: EmpregadoNomeAutocomplete;
    autoCompleteSecretario1: EmpregadoNomeAutocomplete;
    autoCompleteSecretario2: EmpregadoNomeAutocomplete;

    constructor( private route: ActivatedRoute,
        private gerenciaService: GerenciaService,
        private empregadoService: EmpregadoService,
        router: Router) {
        super( gerenciaService, router );
        this.goTo = "gerencia";

        this.gerencia = new GerenciaBuilder().initialize( this.gerencia );
        this.autoCompleteGerente = new EmpregadoNomeAutocomplete(this.empregadoService);
        this.autoCompleteSecretario1 = new EmpregadoNomeAutocomplete(this.empregadoService);
        this.autoCompleteSecretario2 = new EmpregadoNomeAutocomplete(this.empregadoService);
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.gerenciaService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.gerencia = new GerenciaBuilder().clone( res.json() );

                            this.autoCompleteGerente.getAutocomplete().initializeLastValue(
                                    this.gerencia.getGerente().getPessoa().getNome());
                            this.autoCompleteSecretario1.getAutocomplete().initializeLastValue(
                                    this.gerencia.getSecretario1().getPessoa().getNome());
                            this.autoCompleteSecretario2.getAutocomplete().initializeLastValue(
                                    this.gerencia.getSecretario2().getPessoa().getNome());
                            
                            this.getGerencias();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                } else {
                    this.getGerencias();
                }
            } );

    }
    
    getGerencias() {
        this.gerenciaService.getGerenciasWithFilterId( this.gerencia.getId() )
            .then( res => {
                this.gerencias = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    save() {
        super.save( new GerenciaBuilder().clone( this.gerencia ) );
    }
    
}