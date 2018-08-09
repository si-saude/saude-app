import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { FilaAtendimentoOcupacionalBuilder } from './../../controller/fila-atendimento-ocupacional/fila-atendimento-ocupacional.builder';
import { FilaAtendimentoOcupacionalFilter } from './../../controller/fila-atendimento-ocupacional/fila-atendimento-ocupacional.filter';
import { FilaAtendimentoOcupacional } from './../../model/fila-atendimento-ocupacional';
import { LocalizacaoBuilder } from './../../controller/localizacao/localizacao.builder';
import { LocalizacaoFilter } from './../../controller/localizacao/localizacao.filter';
import { Localizacao } from './../../model/localizacao';
import { Profissional } from './../../model/profissional';
import { ProfissionalSaudeFilter } from './../../controller/profissional-saude/profissional-saude.filter';
import { DateFilter } from './../../generics/date.filter';
import { IMyDpOptions } from 'mydatepicker';
import { DateUtil } from './../../generics/utils/date.util';

@Component( {
    selector: 'app-modal-fila-atendimento-ocupacional',
    templateUrl: './modal-fila-atendimento-ocupacional.html',
    styleUrls: ['./modal-fila-atendimento-ocupacional.css']
} )
export class ModalFilaAtendimentoOcupacionalComponent {

    @Input() service;
    @Input() model;
    @Input() profissional: Profissional;
    @Input() showModalFilaAtendimentoOcupacional: boolean;
    filaAtendimentoOcupacional: EventEmitter<FilaAtendimentoOcupacional>;
    private arrayFilaAtendimentoOcupacional: Array<FilaAtendimentoOcupacional>;
    private filter: FilaAtendimentoOcupacionalFilter = new FilaAtendimentoOcupacionalFilter();
    modalFilaAtendimentoOcupacional;
    modelParams;
    private localizacoes: Array<Localizacao>;
    private profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
    protected myDatePickerOptions: IMyDpOptions;
    protected dateUtil: DateUtil;


    constructor( router: Router ) {
        this.modalFilaAtendimentoOcupacional = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.filaAtendimentoOcupacional = new EventEmitter<FilaAtendimentoOcupacional>();
        this.filter.setLocalizacao( new LocalizacaoFilter() );
        this.filter.setInicio( new DateFilter() );
        this.filter.getInicio().setTypeFilter( "ENTRE" );
        this.filter.setPageSize( Math.pow( 2, 31 ) - 1 );
        this.myDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy'
        };
        this.dateUtil = new DateUtil();
    }

    ngOnInit() {
        this.arrayFilaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initializeList( new Array<FilaAtendimentoOcupacional>() );
        this.getLocalizacoes();
    }

    openModalFilaAtendimentoOcupacional() {
        this.modalFilaAtendimentoOcupacional.emit( { action: "modal", params: ['open'] } );
    }

    getLocalizacoes() {
        this.service.getLocalizacoes()
            .then( res => {
                this.localizacoes = new LocalizacaoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( "Erro ao retornar as localizações." );
            } )
    }

    selectFilaAtendimentoOcupacional( filaAtendimentoOcupacional: FilaAtendimentoOcupacional ) {
        this.model.setFilaAtendimentoOcupacional( filaAtendimentoOcupacional );
        this.modalFilaAtendimentoOcupacional.emit( { action: "modal", params: ['close'] } );
    }

    cancelarModalFilaAtendimentoOcupacional() {
        this.showModalFilaAtendimentoOcupacional = false;
        this.modalFilaAtendimentoOcupacional.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalFilaAtendimentoOcupacional.emit( { action: "modal", params: ["close"] } );
    }

    buscarFilaAtendimentosOcupacionais() {
        if ( this.verificarCampos() ) {
            this.profissionalFilter.setId( this.profissional.getId() );
            this.filter.getInicio().setInicio( this.dateUtil.parseDatePickerToDate( this.filter.getInicio().getInicio() ) );
            this.filter.getInicio().setFim( this.dateUtil.parseDatePickerToDate( this.filter.getInicio().getFim() ) );

            this.filter.setProfissional( this.profissionalFilter );
            this.service.getListFilaAtendimentoOcupacional( this.filter )
                .then( res => {
                    this.arrayFilaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().cloneList( res.json().list );
                } )
                .catch( error => {
                    console.log( "Erro ao buscar a Fila de Atendimento Ocupacional" );
                } )
        }
    }

    verificarCampos() {
        if ( ( this.filter.getLocalizacao() == null || this.filter.getLocalizacao().getId() == null ) || this.filter.getLocalizacao() == undefined ||
            this.filter.getInicio().getInicio() == null || this.filter.getInicio().getInicio() == undefined ||
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