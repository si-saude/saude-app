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
import { IMyDpOptions } from 'mydatepicker';
import { DateUtil } from './../../generics/utils/date.util';
import { TarefaService } from './../../controller/tarefa/tarefa.service';

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

    @Input() showModalTarefa: boolean;
    tarefa: EventEmitter<Tarefa>;
    private arrayTarefa: Array<Tarefa>;
    private filter: TarefaFilter = new TarefaFilter();
    modalTarefa;
    modelParams;
    protected myDatePickerOptions: IMyDpOptions;
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
        this.myDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy'
        };
        this.dateUtil = new DateUtil();
    }

    ngOnInit() {
        this.arrayTarefa = new TarefaBuilder().initializeList( new Array<Tarefa>() );
    }

    openModalTarefa() {
        this.modalTarefa.emit( { action: "modal", params: ['open'] } );
    }

    selectTarefa( tarefa: Tarefa ) {
        this.model.setTarefa( tarefa );
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
            this.filter.setStatus("ABERTA");
            

            this.filter.getInicio().setInicio( this.dateUtil.parseDatePickerToDate( this.filter.getInicio().getInicio() ) );
            this.filter.getInicio().setFim( this.dateUtil.parseDatePickerToDate( this.filter.getInicio().getFim() ) );
            this.tarefaService.list( this.filter )
                .then( res => {
                    this.arrayTarefa = new TarefaBuilder().cloneList( res.json().list );
                } )
                .catch( error => {
                    console.log( "Erro ao buscar a Tarefa" );
                } )
        }
    }

    verificarCampos() {
        if ( this.filter.getInicio().getInicio() == null || this.filter.getInicio().getInicio() == undefined ||
            this.filter.getInicio().getFim() == null || this.filter.getInicio().getFim() == undefined ) {
            return false;
        } else
            return true;
    }

//    
//    if ( this.filter.getPessoa().getDataNascimento().getFim() !== null &&
//            this.filter.getPessoa().getDataNascimento().getFim() !== undefined ) {
//    }
}