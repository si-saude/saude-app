import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { AcaoIntervencao } from './../../model/acao-intervencao';
import { AcaoIntervencaoBuilder } from './../../controller/acao-intervencao/acao-intervencao.builder';
@Component( {
    selector: 'app-modal-acao',
    templateUrl: './modal-acao.html',
    styleUrls: ['./modal-acao.css']
} )
export class ModalAcaoComponent{
    @Input() service;
    @Input() model;
    
    private arrayAcoes: Array<AcaoIntervencao>;
    private filter;
    private typeFilter;
    private value;
    modalAcao;
    modelParams;

    constructor( router: Router ) {
        this.modalAcao = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.filter = "";
        this.arrayAcoes = new AcaoIntervencaoBuilder().initializeList(new Array<AcaoIntervencao>());           
    }

    ngOnInit() { 
        this.getAcoes();
    }
    
    openModalAcao( ) {
        this.modalAcao.emit( { action: "modal", params: ['open'] } );
    }
    
    getAcoes() {
        this.service.getAcaoIntervencaoService().getAcaoIntervencoes()
            .then(res => {
                this.arrayAcoes = new AcaoIntervencaoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar a Ação");
            })
    }
    
    selectAcao( acaoIntervencao: AcaoIntervencao) {
        this.model.setAcaoIntervencao(new AcaoIntervencaoBuilder().clone(acaoIntervencao));
        this.modalAcao.emit( { action: "modal", params: ['close'] } );
    }
    
    selectFilter( event, type: string ) {
        this.filter = event.target.value;
        this.typeFilter = type;
        this.value = type;
    }
    
    cancelarModalAcao() {
        this.modalAcao.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalAcao.emit( { action: "modal", params: ["close"] } );
    }

}