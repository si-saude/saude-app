import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { AlimentoBuilder } from './../../controller/alimento/alimento.builder';
import { Alimento } from './../../model/alimento';
import { GlobalVariable } from './../../../../src/app/global';
import { Util } from './../../generics/utils/util';

@Component( {
    selector: 'app-modal-alimento',
    templateUrl: './modal-alimento.html',
    styleUrls: ['./modal-alimento.css']
} )
export class ModalAlimentoComponent {

    private alimentos: Array<Alimento>;
    modalAlimento;
    modelParams;
    

    constructor( router: Router) {
        this.modalAlimento = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.alimentos = new AlimentoBuilder().initializeList(undefined);
    }
    
    removeAlimento(i) {
        this.alimentos.splice(i, 1);
    }
    
    openModalAlimento(alimentos : Array<Alimento>) {
        this.alimentos = new AlimentoBuilder().initializeList(undefined)
        this.alimentos = alimentos;
        this.modalAlimento.emit( { action: "modal", params: ['open'] } );
    }

    cancelarModalAlimento() {
        this.modalAlimento.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalAlimento.emit( { action: "modal", params: ["close"] } );
    }

}