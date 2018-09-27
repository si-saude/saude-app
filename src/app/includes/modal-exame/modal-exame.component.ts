import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Exame } from './../../model/exame';
import { Atestado } from './../../model/atestado';
import { AtestadoBuilder } from './../../controller/atestado/atestado.builder';
import { ExameBuilder } from './../../controller/exame/exame.builder';
import { ExameService } from './../../controller/exame/exame.service';
import { ExameFilter } from './../../controller/exame/exame.filter';

@Component( {
    selector: 'app-modal-exame',
    templateUrl: './modal-exame.html',
    styleUrls: ['./modal-exame.css']
} )
export class ModalExameComponent {
    @Input() atestado: Atestado;
    @Output() exame: EventEmitter<Exame> = new EventEmitter<Exame>();
    private arrayExames: Array<Exame>;
    modalExame;
    
    private filter: any;
    private typeFilter: string;
    private value: string;
    
    constructor( router: Router,
        private exameService: ExameService ) {
        this.modalExame = new EventEmitter<string | MaterializeAction>();
        this.arrayExames = new ExameBuilder().initializeList(new Array<Exame>());
        this.atestado = new AtestadoBuilder().initialize(new Atestado());
    }

    ngOnInit() {}

    openModalExame() {
        this.modalExame.emit( { action: "modal", params: ['open'] } );
    }
    
    selectExame( exame: Exame ) {
        this.exame.emit(exame);
    }
    
    removeExame(exame: Exame) {
        let indexof = this.atestado.getExamesConvocacao().map(e => e.getId()).indexOf(exame.getId());
        this.atestado.getExamesConvocacao().splice(indexof, 1);
    }

    cancelarModalExame() {
        this.modalExame.emit( { action: "modal", params: ['close'] } );
    }

    selectFilter( event, type: string ) {
        this.filter = event.target.value;
        this.typeFilter = type;
        this.value = type;
    }
    
    fetchExames() {
        if ( $("input[name=codigo]").val() == "" && $("input[name=descricao]").val() == "" )
            return;
        
        let exameFilter: ExameFilter = new ExameFilter();
        exameFilter.setPageNumber(1);
        exameFilter.setPageSize(Math.pow(2, 31)-1);
        
        if ( $("input[name=codigo]").val() != "" )
            exameFilter.setCodigo($("input[name=codigo]").val());
        if ( $("input[name=descricao]").val() != "" )
            exameFilter.setDescricao($("input[name=descricao]").val());
        
        this.exameService.list(exameFilter)
            .then(res => {
                $("input[name=codigo]").val("");
                $("input[name=descricao]").val("");
                setTimeout(() => {
                    this.arrayExames = new ExameBuilder().cloneList(res.json().list);
                }, 100);
            })
            .catch(error => {
                console.log("Erro ao buscar os exames.");
            })
    }
    
    onDestroy() {
        this.modalExame.emit( { action: "modal", params: ["close"] } );
    }
}