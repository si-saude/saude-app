import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-confirm-delete',
    templateUrl: './confirm-delete.component.html',
    styleUrls: ['./confirm-delete.component.css']
} )
export class ConfirmDeleteComponent extends GenericListComponent<null, null, null> implements OnInit {
    @Input() service;
    @Input() show: boolean;
    @Input() idDelete: number;
    @Output() cancelDelete: EventEmitter<boolean>;
    modalDelete;
    modelParams;

    constructor( router: Router ) {
        super(null,null,null,router);
        this.modalDelete = new EventEmitter<string | MaterializeAction>();
        this.cancelDelete = new EventEmitter<boolean | MaterializeAction>();
        this.modelParams = [{
            dismissible: false,
            complete: function() { }
        }];
    }

    ngOnInit() { }

    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["show"].currentValue === true )
            setTimeout(() => this.modalDelete.emit( { action: "modal", params: ["open"] } ), 1 );
    }

    confirmDelete() {
        this.showPreload = true;
        this.service.delete( this.idDelete )
            .then( res => {
                this.cancelDelete.emit(true);
            } )
            .catch( error => {
                alert("Erro ao excluir o campo: " + error.text());
            } )
    }
    
    closeModalDelete() {
        this.cancelDelete.emit(false);
        this.modalDelete.emit( { action: "modal", params: ["close"] } );
    }
    
    onDestroy() {
        this.modalDelete.emit( { action: "modal", params: ["close"] } );
    }

}