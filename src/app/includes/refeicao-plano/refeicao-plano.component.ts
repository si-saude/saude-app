import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { RefeicaoPlano } from './../../model/refeicao-plano';
import { RefeicaoPlanoBuilder } from './../../controller/refeicao-plano/refeicao-plano.builder';

@Component( {
    selector: 'app-refeicao-plano',
    templateUrl: './refeicao-plano.html',
    styleUrls: ['./refeicao-plano.css']
} )
export class PlanoAlimentarRefeicaoComponent{
    @Output() refeicaoEmit: EventEmitter<RefeicaoPlano>;
    private refeicao: RefeicaoPlano;
    modalRefeicao;

    constructor() {
        this.modalRefeicao = new EventEmitter<string | MaterializeAction>();
        this.refeicaoEmit = new EventEmitter<RefeicaoPlano>();
        this.refeicao = new RefeicaoPlanoBuilder().initialize(null);
    }

    cancelModalRefeicao() {
        this.modalRefeicao.emit( { action: "modal", params: ['close'] } );
    }
    
    confirmModalRefeicao() {
        if ( this.refeicao.getNome() == undefined || 
                this.refeicao.getNome() == "" )
            return;
        this.refeicaoEmit.emit(new RefeicaoPlanoBuilder().clone(this.refeicao));
        this.modalRefeicao.emit( { action: "modal", params: ["close"] } );
    }

    onDestroy() {
        this.modalRefeicao.emit( { action: "modal", params: ["close"] } );
    }
    
    openModalRefeicao() {
        this.modalRefeicao.emit( { action: "modal", params: ['open'] } );
    }

}