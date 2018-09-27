import { EventEmitter, SimpleChanges, Component, Input, Output } from '@angular/core';

import { MaterializeAction } from "angular2-materialize";

@Component( {
    selector: 'app-modal-display-text',
    templateUrl: './modal-display-text.component.html',
    styleUrls: ['./modal-display-text.component.css']
} )
export class ModalDisplayTextComponent {
    private msn: string;
    modalDisplayText;

    constructor() {
        this.modalDisplayText = new EventEmitter<string | MaterializeAction>();
    }
    
    openModal(text: string) {
        this.msn = text;
        this.modalDisplayText.emit( { action: "modal", params: ["open"] } );
    }

    confirm() {
        this.modalDisplayText.emit( { action: "modal", params: ["close"] } );
    }
    
    onDestroy() {
        this.modalDisplayText.emit( { action: "modal", params: ["close"] } );
    }

}