import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { GerenciaFilter } from './../gerencia.filter';
import { GerenciaService } from './../gerencia.service';
import { Gerencia } from './../../../model/gerencia';
import { GlobalVariable } from './../../../global';

@Component( {
    selector: 'app-gerencia-editar',
    templateUrl: './../gerencia-form/gerencia-form.html',
    styleUrls: ['./../gerencia-form/gerencia-form.css']
} )
export class GerenciaEditarComponent implements OnInit {

    private titulo: string = "Editar";
    private corTitulo: string = GlobalVariable.COLOR_TITLE;
    private inscricao: Subscription;
    private gerencia: Gerencia = new Gerencia();
    private formulario: FormGroup;
    //  private permissoesArray: FormArray;
    private gerenciaFilter: GerenciaFilter = new GerenciaFilter();
    private gerencias: Array<Gerencia>;
    private colorMsg: string;
    private msg: string;
    private verifyMsg: boolean = false;


    constructor( private route: ActivatedRoute,
        private gerenciaService: GerenciaService,
        private formBuilder: FormBuilder ) {
    }

    ngOnInit() {

        this.formulario = this.formBuilder.group( {
            codigo: [null, Validators.required],
            descricao: [null],
            id: [null],
            version: [null],
            gerencia: ['']
        } );

        this.gerenciaService.list( this.gerenciaFilter )
            .then( res => {
                this.gerencias = JSON.parse( JSON.stringify( res.json().list ) );
            } )
            .catch( error => {
                console.log( error );
            } )

        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];

                this.addFormWithGerencia( id );

            }
        );

    }

    addFormWithGerencia( id: number ) {

        this.gerenciaService.get( id )
            .then( res => {
                this.gerencia = JSON.parse( JSON.stringify( res.json() ) );

                if ( this.gerencia.gerencia !== undefined ) {

                    this.formulario = this.formBuilder.group( {
                        codigo: [this.gerencia.codigo],
                        id: [this.gerencia.id],
                        version: [this.gerencia.version],
                        descricao: [this.gerencia.descricao],
                        gerencia: [this.gerencia.gerencia.id]
                    } );

                } else {
                    this.formulario = this.formBuilder.group( {
                        codigo: [this.gerencia.codigo],
                        id: [this.gerencia.id],
                        version: [this.gerencia.version],
                        descricao: [this.gerencia.descricao],
                        gerencia: ['']
                    } );
                }
            } )
            .catch( error =>
                console.log( error ) );

    }

    isValid() {
        if ( this.formulario.valid ) {
            return true;
        } else { return false; }
    }

    save() {
        console.log( this.formulario.value );
                this.gerenciaService.submit( this.formulario.value )
                    .then( res => {
                        this.verifyMsg = true;
                        this.colorMsg = "green";
                        this.msg = res.text();
                    } )
                    .catch( error => {
                        this.verifyMsg = true;
                        this.colorMsg = "red";
                        this.msg = error.text();
                    } );
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }

}
