import { EventEmitter, SimpleChanges, Component, Input, Output } from '@angular/core';

import { MaterializeAction } from "angular2-materialize";
import { Atestado } from "./../../model/atestado";
import { AtestadoBuilder } from './../../controller/atestado/atestado.builder';

@Component( {
    selector: 'app-modal-auditoria-atestado',
    templateUrl: './modal-auditoria-atestado.component.html',
    styleUrls: ['./modal-auditoria-atestado.component.css']
} )
export class ModalAuditoriaAtestadoComponent {
    @Input() atestado: Atestado;
    @Output() confirm: EventEmitter<boolean>;
    private modalAuditoriaAtestado;
    private arrayConforme: Array<boolean>;

    constructor() {
        this.atestado = new Atestado();
        this.modalAuditoriaAtestado = new EventEmitter<string | MaterializeAction>();
        this.confirm = new EventEmitter<boolean | MaterializeAction>();
        this.arrayConforme = new Array<boolean>();
    }
    
    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["atestado"] != undefined ) {
            this.atestado = changes["atestado"].currentValue;
            this.arrayConforme = new Array<boolean>();
            this.atestado.getAuditoriaAtestados().forEach(aa => {
                this.arrayConforme.push(aa.getConforme());
            })
        }
    }
    
    changeConforme(evento, index) {
        if ( evento.target.checked )
            this.arrayConforme[index] = true;
        else this.arrayConforme[index] = false;
    }
    
    openModal() {
        this.modalAuditoriaAtestado.emit( { action: "modal", params: ["open"] } );
    }

    confirmar() {
        this.confirm.emit(true);
    }
    
    cancel() {
        this.confirm.emit(false);
    }
    
    onDestroy() {
        this.modalAuditoriaAtestado.emit( { action: "modal", params: ["close"] } );
    }

    verifyConfirm() {
        if ( this.atestado.getAuditoriaAtestados() != null ) {
            if ( this.arrayConforme.find(ac => !ac) != undefined )
                return true;
        }
        return false;
    }
}