import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { Refeicao } from './../../model/refeicao';
import { RefeicaoBuilder } from './../../controller/refeicao/refeicao.builder';

@Component( {
    selector: 'app-recordatorio-refeicao',
    templateUrl: './recordatorio-refeicao.html',
    styleUrls: ['./recordatorio-refeicao.css']
} )
export class RecordatorioRefeicaoComponent{
    @Input() service;
    @Output() refeicaoEmit: EventEmitter<Refeicao>;
    private refeicao: Refeicao;
    modalRefeicao;

    constructor() {
        this.modalRefeicao = new EventEmitter<string | MaterializeAction>();
        this.refeicaoEmit = new EventEmitter<Refeicao>();
        this.refeicao = new RefeicaoBuilder().initialize(null);
    }

    cancelModalRefeicao() {
        this.modalRefeicao.emit( { action: "modal", params: ['close'] } );
    }
    
    confirmModalRefeicao() {
        if ( this.refeicao.getNome() == undefined || 
                this.refeicao.getNome() == "" )
            return;
        this.refeicaoEmit.emit(new RefeicaoBuilder().clone(this.refeicao));
        this.modalRefeicao.emit( { action: "modal", params: ["close"] } );
    }

    onDestroy() {
        this.modalRefeicao.emit( { action: "modal", params: ["close"] } );
    }
    
    openModalRefeicao() {
        this.modalRefeicao.emit( { action: "modal", params: ['open'] } );
    }

}