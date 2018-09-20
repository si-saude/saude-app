import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { TarefaFilter } from './../../controller/tarefa/tarefa.filter';
import { Tarefa } from './../../model/tarefa';
import { EmpregadoFilter } from './../../controller/empregado/empregado.filter';
import { TarefaService } from './../../controller/tarefa/tarefa.service';

@Component( {
    selector: 'app-modal-tarefa-simple',
    templateUrl: './modal-tarefa-simple.html',
    styleUrls: ['./modal-tarefa-simple.css']
} )
export class ModalTarefaSimpleComponent {
    @Output() tarefa: EventEmitter<Tarefa>;
    
    private arrayTarefa: Array<Tarefa>;
    private modalTarefa: EventEmitter<string | MaterializeAction>;
    
    constructor(private tarefaService: TarefaService) {
        this.modalTarefa = new EventEmitter<string | MaterializeAction>();
        this.tarefa = new EventEmitter<Tarefa>();
        this.arrayTarefa = new TarefaBuilder().initializeList( new Array<Tarefa>() );
    }
    
    callModalTarefa(tarefaFilter: TarefaFilter) {
        this.tarefaService.list( tarefaFilter )
            .then( res => {
                this.arrayTarefa = new TarefaBuilder().cloneList( res.json().list );
            } )
            .catch( error => {
                console.log( "Erro ao buscar a Tarefa" );
            } )
    }
    
    openModalTarefa() {
        this.modalTarefa.emit( { action: "modal", params: ['open'] } );
    }

    selectTarefa( tarefa: Tarefa ) {
        this.tarefa.emit( new TarefaBuilder().clone(tarefa) );
        this.modalTarefa.emit( { action: "modal", params: ['close'] } );
    }

    cancelarModalTarefa() {
        this.modalTarefa.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalTarefa.emit( { action: "modal", params: ["close"] } );
    }

}