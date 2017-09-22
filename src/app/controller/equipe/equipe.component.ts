import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { EquipeFilter } from './equipe.filter';
import { EquipeService } from './equipe.service';

@Component( {
    selector: 'app-equipe',
    templateUrl: './equipe.component.html',
    styleUrls: ['./equipe.component.css']
} )
export class EquipeComponent implements OnInit {

    private corTitulo: string = GlobalVariable.COLOR_TITLE;
    private titulo: string = "Equipes";

    private formulario: FormGroup;
    private equipes: Array<Object>;
    private equipeFilter: EquipeFilter = new EquipeFilter();
    private paginas: number[];

    private msgError: string = '';
    private verifyError: boolean = false;
    private verifyEmptyPaginas: boolean = false;
    private msgEmptyPaginas: string = "Nenhum registro encontrado.";
    private colorEmptyPaginas: string = "orange";
    private showPreload: boolean = true;
    private msgPreload: string = "Aguarde processamento...";

    modalActions = new EventEmitter<string | MaterializeAction>();
    modelParams = [{
        dismissible: false,
        complete: function() { }
    }]

    constructor( private equipeService: EquipeService,
        private formBuilder: FormBuilder ) { }

    ngOnInit() {

        this.equipeService.list( this.equipeFilter )
            .then( res => {
                this.showPreload = false;
                this.equipes = JSON.parse( JSON.stringify( res.json() ) ).list;
                this.paginas = this.getPaginas( res.json().total );
                if ( res.json().total === 0 ) {
                    this.verifyEmptyPaginas = true;
                } else {
                    this.verifyEmptyPaginas = false;
                }
            } );

    }

    getPaginas( total: number ) {
        let pageSize = this.equipeFilter.getPageSize();
        if ( total % pageSize > 0 ) {
            return Array( Math.floor(( total / pageSize ) + 1 ) );
        } else {
            return Array( total / pageSize );
        }
    }

    filterNome() {
        this.showPreload = true;
        this.equipeService.list( this.equipeFilter )
            .then( res => {
                this.equipes = JSON.parse( JSON.stringify( res.json() ) ).list;
                this.paginas = this.getPaginas( res.json().total );
                if ( res.json().total === 0 ) {
                    this.verifyEmptyPaginas = true;
                } else {
                    this.verifyEmptyPaginas = false;
                }
                this.showPreload = false;
            } );
    }

    openModal() {
        this.modalActions.emit( { action: "modal", params: ['open'] } );
    }

    closeModal() {
        this.modalActions.emit( { action: "modal", params: ['close'] } );
    }

    goToPage( index: number ) {
        this.showPreload = true;
        if ( index < 1 || index > this.paginas.length ) {
            this.showPreload = false;
            return;
        }
        this.equipeFilter.setPageNumber( index );
        this.equipeFilter.setPageSize( 2 );
        this.equipeService.list( this.equipeFilter )
            .then( res => {
                this.equipes = JSON.parse( JSON.stringify( res.json() ) ).list;
                this.paginas = this.getPaginas( res.json().total );
                this.showPreload = false;
            } )
            .catch( error => {
                console.log( error );
            } );
    }

    activePage( index: number ) {
        if ( index === this.equipeFilter.getPageNumber() ) {
            return 'active';
        } else {
            return '';
        }
    }
    
    delete(id) {
        this.showPreload = true;
        this.equipeService.delete(id)
            .then(res => {
                this.showPreload = false;
                window.location.reload();
            })
            .catch(error => {
                this.showPreload = false;
                console.log(error.text());
            })
    }

}










