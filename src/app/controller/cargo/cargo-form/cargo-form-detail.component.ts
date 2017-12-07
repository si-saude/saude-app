import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Cargo } from './../../../model/cargo';
import { Curso } from './../../../model/curso';
import { CursoBuilder } from './../../curso/curso.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { CargoBuilder } from './../cargo.builder';
import { CargoService } from './../cargo.service';

@Component( {
    selector: 'app-cargo-form-detail',
    templateUrl: './cargo-form-detail.html',
    styleUrls: ['./cargo-form.css', './../../../../assets/css/form-component.css']
} )
export class CargoFormDetailComponent extends GenericFormComponent implements OnInit {
    cargo: Cargo;
    cursos: Array<Curso>;
    cursosSelecteds: Array<Curso>;

    constructor( private route: ActivatedRoute,
        private cargoService: CargoService ) {
        super( cargoService );

        this.goTo = "cargo";
        this.cargo = new CargoBuilder().initialize( this.cargo );
    }

    ngOnInit() {
        this.cursosSelecteds = new Array<Curso>();

        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.cargoService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.cargo = new CargoBuilder().clone( res.json() );
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );

        this.cargoService.getCursos()
            .then( res => {
                this.cursos = new CursoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }

}