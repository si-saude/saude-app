import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

@Component( {
    selector: 'app-modal-message',
    templateUrl: './modal-message.html',
    styleUrls: ['./modal-message.css']
} )
export class ModalMessageComponent {
    private modal: EventEmitter<string | MaterializeAction>;
    private title: string;
    private msg: string;
    
    constructor() {
        this.modal = new EventEmitter<string | MaterializeAction>();
    }
    
    configureModal(title: string, msg: string) {
        this.title = title;
        this.msg = msg;
    }
    
    openModal() {
        this.modal.emit( { action: "modal", params: ['open'] } );
    }

    closeModal() {
        this.modal.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modal.emit( { action: "modal", params: ["close"] } );
    }

}