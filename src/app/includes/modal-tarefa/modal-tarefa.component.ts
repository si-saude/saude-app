import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { TarefaFilter } from './../../controller/tarefa/tarefa.filter';
import { Tarefa } from './../../model/tarefa';
import { ServicoFilter } from './../../controller/servico/servico.filter';
import { EmpregadoFilter } from './../../controller/empregado/empregado.filter';
import { EquipeFilter } from './../../controller/equipe/equipe.filter';
import { DateFilter } from './../../generics/date.filter';
import { DateUtil } from './../../generics/utils/date.util';
import { TarefaService } from './../../controller/tarefa/tarefa.service';
import { GlobalVariable } from './../../../../src/app/global';
import { Util } from './../../generics/utils/util';

@Component( {
    selector: 'app-modal-tarefa',
    templateUrl: './modal-tarefa.html',
    styleUrls: ['./modal-tarefa.css']
} )
export class ModalTarefaComponent {

    @Input() service;
    @Input() model;
    @Input() servicoId;
    @Input() empregadoId;
    @Input() equipeId;
    @Output() setTarefa : EventEmitter<DateFilter> = new EventEmitter();
    @Input() showModalTarefa: boolean;
    tarefa: EventEmitter<Tarefa>;
    private arrayTarefa: Array<Tarefa>;
    private filter: TarefaFilter = new TarefaFilter();
    modalTarefa;
    modelParams;
    protected dateUtil: DateUtil;
    

    constructor( router: Router,
        private tarefaService: TarefaService ) {
        this.modalTarefa = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.tarefa = new EventEmitter<Tarefa>();
        this.filter.setInicio( new DateFilter() );
        this.filter.setServico( new ServicoFilter() );
        this.filter.setCliente( new EmpregadoFilter() );
        this.filter.setEquipe( new EquipeFilter() );
        this.filter.getInicio().setTypeFilter( "ENTRE" );
        this.filter.setPageSize( Math.pow( 2, 31 ) - 1 );
        this.dateUtil = new DateUtil();
    }

    ngOnInit() {
        this.arrayTarefa = new TarefaBuilder().initializeList( new Array<Tarefa>() );
    }
    
    setPeriodoFilter(periodo : DateFilter){   
        this.filter.getInicio().setInicio(periodo.getInicio());
        this.filter.getInicio().setFim(periodo.getFim());  
    }

    openModalTarefa() {
        this.modalTarefa.emit( { action: "modal", params: ['open'] } );
    }

    selectTarefa( tarefa: Tarefa ) {
        this.model.setTarefa( new TarefaBuilder().clone(tarefa) );
        this.setTarefa.emit(null);
        this.modalTarefa.emit( { action: "modal", params: ['close'] } );
    }

    cancelarModalTarefa() {
        this.showModalTarefa = false;
        this.modalTarefa.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalTarefa.emit( { action: "modal", params: ["close"] } );
    }

    buscarTarefas() {
        if ( this.verificarCampos() ) {
            this.filter.getServico().setId( this.servicoId );
            this.filter.getCliente().setId( this.empregadoId );
            this.filter.getEquipe().setId( this.equipeId );
            this.tarefaService.listAtendimentoAvulso( this.filter )
                .then( res => {
                    this.arrayTarefa = new TarefaBuilder().cloneList( res.json().list );
                } )
                .catch( error => {
                    console.log( "Erro ao buscar a Tarefa" );
                } )
        }
    }

    verificarCampos() {                   
        if (Util.isNotNull(this.filter.getInicio().getInicio()) && Util.isNotNull(this.filter.getInicio().getFim())) {
            return true;
        } else
            return false;
    }
}