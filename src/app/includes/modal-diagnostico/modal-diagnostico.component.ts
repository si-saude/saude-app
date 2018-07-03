import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Diagnostico } from './../../model/diagnostico';
import { DiagnosticoBuilder } from './../../controller/diagnostico/diagnostico.builder';
import { Eixo } from './../../model/eixo';
import { EixoBuilder } from './../../controller/eixo/eixo.builder';

/**
 * Para criar esse modal, deve-se criar as fun��es open, select e cancel na classe onde ele ser� utilizado
 */
@Component( {
    selector: 'app-modal-diagnostico',
    templateUrl: './modal-diagnostico.html',
    styleUrls: ['./modal-diagnostico.css']
} )
export class ModalDiagnosticoComponent{
    @Input() service;
    @Input() showModalDiagnostico: boolean;
    @Input() idEquipeProfissional: number;
    @Output() diagnostico: EventEmitter<Diagnostico>;
    @Output() cancelModalDiagnostico: EventEmitter<boolean>;
    private arrayDiagnostico: Array<Diagnostico>;
    private eixos: Array<Eixo>;
    private selectEixoId: string;
    private filter;
    private typeFilter;
    private value;
    private idEqpProf;
    modalDiagnostico;
    modelParams;

    constructor( router: Router ) {
        this.modalDiagnostico = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.diagnostico = new EventEmitter<Diagnostico>();
        this.cancelModalDiagnostico = new EventEmitter<boolean>();
        this.filter = "";
    }

    ngOnInit() { 
        this.arrayDiagnostico = new DiagnosticoBuilder().initializeList(new Array<Diagnostico>());
        this.eixos = new EixoBuilder().initializeList(new Array<Eixo>());
    }

    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["idEquipeProfissional"] != undefined ) 
            this.idEqpProf = changes["idEquipeProfissional"].currentValue; 
        if ( changes["showModalDiagnostico"] != undefined && changes["showModalDiagnostico"].currentValue === true )
            setTimeout(() => this.openModalDiagnostico(), 1 );
        if ( changes["inner"] != undefined && changes["showModalDiagnostico"].currentValue === true )
            setTimeout(() => this.openModalDiagnostico(), 1 );
    }
    
    openModalDiagnostico() {
        this.service.getEixosByEquipe( this.idEqpProf )
            .then(res => {
                this.eixos = new EixoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao retornar os eixos.");
            })
        this.modalDiagnostico.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchDiagnosticos( ) {
        if ( this.selectEixoId != "" ) {
            $("input[name='codigo']").val('');
            $("input[name='descricao']").val('');
            this.filter = '';
            this.service.getDiagnosticoByEixo( this.selectEixoId, this.idEqpProf )
                .then(res => {
                    this.arrayDiagnostico = new DiagnosticoBuilder().cloneList(res.json());
                    this.value = 'change';
                })
                .catch(error => {
                    console.log("Erro ao buscar o diagnostico por descricao");
                })
        }
    }
    
    selectDiagnostico( diagnostico: Diagnostico) {
        this.diagnostico.emit(diagnostico);
        this.modalDiagnostico.emit( { action: "modal", params: ['close'] } );
    }
    
    selectFilter( event, type: string ) {
        this.filter = event.target.value;
        this.typeFilter = type;
        this.value = type;
    }
    
    cancelarModalDiagnostico() {
        this.cancelModalDiagnostico.emit(true);
        this.modalDiagnostico.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalDiagnostico.emit( { action: "modal", params: ["close"] } );
    }

}