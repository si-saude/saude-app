import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { GerenciaFilter } from './../gerencia.filter';
import { GerenciaService } from './../gerencia.service';
import { Gerencia } from './../../../model/gerencia';
import { GlobalVariable } from './../../../global';
import { GenericGerenciaComponent } from './../../../generics/generic.gerencia.component';

@Component( {
    selector: 'app-gerencia-editar',
    templateUrl: './../gerencia-form/gerencia-form.html',
    styleUrls: ['./../gerencia-form/gerencia-form.css']
} )
export class GerenciaEditarComponent extends GenericGerenciaComponent implements OnInit {

    private titulo: string = "Editar";
    private corTitulo: string = GlobalVariable.COLOR_TITLE;
    private inscricao: Subscription;
//    private gerencia: Gerencia = new Gerencia();
//    private formulario: FormGroup;
    //  private permissoesArray: FormArray;
//    private gerenciaFilter: GerenciaFilter = new GerenciaFilter();
//    private gerencias: Array<Gerencia>;
//    private colorMsg: string;
//    private msg: string;
//    private verifyMsg: boolean = false;


    constructor( private route: ActivatedRoute,
        gerenciaService: GerenciaService,
        formBuilder: FormBuilder ) {
        super(gerenciaService, formBuilder);
    }

    ngOnInit() {

        this.formulario = this.formBuilder.group( {
            codigo: [null, Validators.required],
            descricao: [null],
            id: [null],
            version: [null],
            gerencia: ['']
        } );

        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];

                this.addFormWithGerencia( id );

            }
        );

    }

    addFormWithGerencia( id: number ) {
        
        this.gerenciaFilter.setId(id);
        
        this.gerenciaService.selectList( this.gerenciaFilter )
            .then( res => {
//                console.log( JSON.stringify( res.json()) );
                this.gerencias = JSON.parse( JSON.stringify( res.json() ) );
            } )
            .catch( error => {
                console.log( error );
            } )

        this.gerenciaService.get( id )
            .then( res => {
//                this.gerencia = JSON.parse( JSON.stringify( res.json() ) );
//
//                if ( this.gerencia.gerencia !== undefined ) {
//
//                    this.formulario = this.formBuilder.group( {
//                        codigo: [this.gerencia.codigo],
//                        id: [this.gerencia.id],
//                        version: [this.gerencia.version],
//                        descricao: [this.gerencia.descricao],
//                        gerencia: [this.gerencia.gerencia.id]
//                    } );
//
//                } else {
//                    this.formulario = this.formBuilder.group( {
//                        codigo: [this.gerencia.codigo],
//                        id: [this.gerencia.id],
//                        version: [this.gerencia.version],
//                        descricao: [this.gerencia.descricao],
//                        gerencia: ['']
//                    } );
//                }
            } )
            .catch( error =>
                console.log( error ) );
    }

    isValid() {
        return super.isValid();
    }

    save() {
        super.save();
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }

}
