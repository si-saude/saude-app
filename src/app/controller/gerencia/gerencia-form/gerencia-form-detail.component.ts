import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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

    constructor( private route: ActivatedRoute,
        private gerenciaService: GerenciaService,
        private empregadoService: EmpregadoService,
        router: Router) {
        super( gerenciaService, router );
        this.goTo = "gerencia";

        this.gerencias = new Array<Gerencia>();
        this.gerencia = new GerenciaBuilder().initialize( this.gerencia );
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