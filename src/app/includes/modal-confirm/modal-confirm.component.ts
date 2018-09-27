import { EventEmitter, SimpleChanges, Component, Input, Output } from '@angular/core';

import { MaterializeAction } from "angular2-materialize";

@Component( {
    selector: 'app-modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.css']
} )
export class ModalConfirmComponent {
    private msn: string;
    @Output() value: EventEmitter<boolean>;
    modalConfirm;

    constructor() {
        this.modalConfirm = new EventEmitter<string | MaterializeAction>();
        this.value = new EventEmitter<boolean | MaterializeAction>();
    }
    
    setMensagem(msn: string) {
        this.msn = msn;
    }
    
    getMensagem() {
        return this.msn;
    }
    
    openModal() {
        this.modalConfirm.emit( { action: "modal", params: ["open"] } );
    }

    confirm() {
        this.value.emit(true);
    }
    
    cancel() {
        this.value.emit(false);
    }
    
    onDestroy() {
        this.modalConfirm.emit( { action: "modal", params: ["close"] } );
    }

}