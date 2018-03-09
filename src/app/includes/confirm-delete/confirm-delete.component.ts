import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-confirm-delete',
    templateUrl: './confirm-delete.component.html',
    styleUrls: ['./confirm-delete.component.css']
} )
export class ConfirmDeleteComponent {
    @Input() service;
    @Input() show: boolean;
    @Input() idDelete: number;
    modalDelete;
    modalParams;

    constructor( router: Router ) {
        this.modalDelete = new EventEmitter<string | MaterializeAction>();
        this.modalParams = [{
            dismissible: false,
            complete: function() { }
        }];
    }

    ngOnInit() {
        //para cancelar o ngoninit do list
    }
    
    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["show"].currentValue === true )
            setTimeout(() => this.modalDelete.emit( { action: "modal", params: ["open"] } ), 1 );
    }
    
    confirmDelete() {
        this.service.delete( this.idDelete )
            .then( res => {
                window.location.reload();
            } )
            .catch( error => {
                window.location.reload();
                alert("Erro ao excluir o campo: " + error.text());
            } )
    }
    
    closeModalDelete() {
        this.modalDelete.emit( { action: "modal", params: ['close'] } );
        window.location.reload();
    }

    onDestroy() {
        this.modalDelete.emit( { action: "modal", params: ["close"] } );
    }

}