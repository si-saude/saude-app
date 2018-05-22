import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Intervencao } from './../../model/intervencao';
import { IntervencaoBuilder } from './../../controller/intervencao/intervencao.builder';/**
 * Para criar esse modal, deve-se criar as funções open, select e cancel na classe onde ele será utilizado
 */
@Component( {
    selector: 'app-modal-intervencao',
    templateUrl: './modal-intervencao.html',
    styleUrls: ['./modal-intervencao.css']
} )
export class ModalIntervencaoComponent{
    @Input() service;
    @Input() showModalIntervencao: boolean;
    @Input() idEquipeProfissional: number;
    @Output() intervencao: EventEmitter<Intervencao>;
    @Output() cancelModalIntervencao: EventEmitter<boolean>;
    private arrayIntervencao: Array<Intervencao>;
    private filter;
    private typeFilter;
    private value;
    private idEqpProf;
    modalIntervencao;
    modelParams;

    constructor( router: Router ) {
        this.modalIntervencao = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.intervencao = new EventEmitter<Intervencao>();
        this.cancelModalIntervencao = new EventEmitter<boolean>();
        this.filter = "";
    }

    ngOnInit() { 
        this.arrayIntervencao = new IntervencaoBuilder().initializeList(new Array<Intervencao>());
    }

    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["idEquipeProfissional"] != undefined ) 
            this.idEqpProf = changes["idEquipeProfissional"].currentValue; 
        if ( changes["showModalIntervencao"] != undefined && changes["showModalIntervencao"].currentValue === true )
            setTimeout(() => this.openModalIntervencao(), 1 );
    }
    
    openModalIntervencao( ) {
        this.value = "$*new*$";
        this.filter = $("input[name='filter-intervencao-descricao']").val('');
        this.modalIntervencao.emit( { action: "modal", params: ['open'] } );
        this.fetchIntervencao();
    }
    
    fetchIntervencao() {
        this.service.getIntervencoesByEquipe( this.idEqpProf )
            .then(res => {
                this.arrayIntervencao = new IntervencaoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar o diagnostico por descricao");
            })
    }
    
    selectIntervencao( intervencao: Intervencao) {
        this.intervencao.emit(intervencao);
        this.modalIntervencao.emit( { action: "modal", params: ['close'] } );
    }
    
    selectFilter( event, type: string ) {
        let splitType = type.split('-');   
        this.filter = event;
        this.typeFilter = splitType[2];
        this.value = $('input[name='+type).val();
    }
    
    cancelarModalIntervencao() {
        this.cancelModalIntervencao.emit(true);
        this.modalIntervencao.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalIntervencao.emit( { action: "modal", params: ["close"] } );
    }

}