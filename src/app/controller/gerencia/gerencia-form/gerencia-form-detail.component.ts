import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Gerencia } from './../../../model/gerencia';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { GerenciaBuilder } from './../gerencia.builder';
import { GerenciaService } from './../gerencia.service';
import { EmpregadoService } from './../../empregado/empregado.service';

@Component( {
    selector: 'app-gerencia-form-detail',
    templateUrl: './gerencia-form-detail.html',
    styleUrls: ['./gerencia-form.css', './../../../../assets/css/form-component.css']
} )
export class GerenciaFormDetailComponent extends GenericFormComponent implements OnInit {
    gerencia: Gerencia;
    gerencias: Array<Gerencia>;
    gerentes: Array<Empregado>;
    secretarios1: Array<Empregado>;
    secretarios2: Array<Empregado>;
    autocompleteGerente;
    autocompleteSecretario1;
    autocompleteSecretario2;
    flagAutocomplete: boolean;

    constructor( private route: ActivatedRoute,
        private gerenciaService: GerenciaService,
        private empregadoService: EmpregadoService ) {
        super( gerenciaService );
        this.goTo = "gerencia";

        this.gerentes = new Array<Empregado>();
        this.secretarios1 = new Array<Empregado>();
        this.secretarios2 = new Array<Empregado>();
        this.gerencias = new Array<Gerencia>();
        this.gerencia = new GerenciaBuilder().initialize( this.gerencia );
        this.flagAutocomplete = false;
        this.autocompleteGerente = [];
        this.autocompleteSecretario1 = [];
        this.autocompleteSecretario2 = [];
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.gerenciaService.get( id )
                    .then( res => {
                        this.showPreload = false;

                        this.gerencia = new GerenciaBuilder().clone( res.json() );

                        if ( this.gerencia.getGerente().getId() > 0 )
                            this.gerentes.push( new EmpregadoBuilder().clone( this.gerencia.getGerente() ) );

                        if ( this.gerencia.getSecretario1().getId() > 0 )
                            this.secretarios1.push( new EmpregadoBuilder().clone( this.gerencia.getSecretario1() ) );

                        if ( this.gerencia.getSecretario2().getId() > 0 )
                            this.secretarios2.push( new EmpregadoBuilder().clone( this.gerencia.getSecretario2() ) );

                        this.gerenciaService.getGerenciasWithFilterId( this.gerencia.getId() )
                            .then( res => {
                                this.gerencias = res.json();
                            } )
                            .catch( error => {
                                console.log( error );
                            } )

                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );

    }

}