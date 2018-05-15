import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Intervencao } from './../../model/intervencao';
import { IntervencaoBuilder } from './../../controller/intervencao/intervencao.builder';

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
    modalIntervencao;
    modelParams;

    constructor( router: Router ) {
        this.modalIntervencao = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: false,
            complete: function() { }
        }];
        this.intervencao = new EventEmitter<Intervencao>();
        this.cancelModalIntervencao = new EventEmitter<boolean>(); 
        this.filter = "";
    }

    ngOnInit() { 
        this.arrayIntervencao = new IntervencaoBuilder().initializeList(new Array<Intervencao>());
        this.fetchIntervencao();
    }

    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["showModalIntervencao"] != undefined && changes["showModalIntervencao"].currentValue === true )
            setTimeout(() => this.modalIntervencao.emit( { action: "modal", params: ["open"] } ), 1 );
    }
    
    openModalIntervencao( ) {
        this.value = "$*new*$";
        this.filter = $("input[name='filter-intervencao-descricao']").val('');
        this.fetchIntervencao();
    }
    
    fetchIntervencao() {
        this.service.getIntervencoesByEquipe( this.idEquipeProfissional )
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
        this.modalIntervencao.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.cancelModalIntervencao.emit(false);
        this.modalIntervencao.emit( { action: "modal", params: ["close"] } );
    }

}