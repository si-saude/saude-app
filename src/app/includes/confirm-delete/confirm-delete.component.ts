import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';
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
    modalDelete;
    modelParams;

    constructor( router: Router ) {
        super(null,null,null,router);
        this.modalDelete = new EventEmitter<string | MaterializeAction>();
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

    confirmDel() {
        this.tempDelete = this.idDelete;
        super.confirmDelete();
    }

    onDestroy() {
        this.modalDelete.emit( { action: "modal", params: ["close"] } );
    }

}