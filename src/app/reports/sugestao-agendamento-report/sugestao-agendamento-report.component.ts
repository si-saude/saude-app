import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'fullcalendar';
import { MaterializeAction } from "angular2-materialize";
import * as moment from 'moment';

import { SugestaoAgendamentoDto } from './../../model/dto/sugestao-agendamento-dto';
import { SugestaoAgendamentoReportService } from './sugestao-agendamento-report.service';
import { SugestaoAgendamentoReportBuilder } from './sugestao-agendamento-report.builder';
import { ConvocacaoFilter } from './../../controller/convocacao/convocacao.filter';
import { Convocacao } from './../../model/convocacao';
import { ConvocacaoBuilder } from './../../controller/convocacao/convocacao.builder';

@Component( {
    selector: 'app-sugestao-agendamento-report',
    templateUrl: './sugestao-agendamento-report.html',
    styleUrls: ['./sugestao-agendamento-report.css']
} )
export class SugestaoAgendamentoReportComponent implements OnInit {
    calendarOptions: Object;
    sugestoes: Array<SugestaoAgendamentoDto>;
    toastParams;
    globalActions;
    showNothing: boolean;
    activeEditTarefa: boolean;
    firtTime: boolean;
    private convocacaoId: number;
    private tipoConvocacoes: Array<string>;
    private convocacoes: Array<Convocacao>;
    private titleEvent: string;
    private objetos: Map<string, Array<SugestaoAgendamentoDto>>;
    private selectedObjetos: Array<SugestaoAgendamentoDto>;
    private modalConfirm;
    
    constructor( router: Router, private sugestaoAgendamentoService: SugestaoAgendamentoReportService ) {
        let component = this;
        this.firtTime = false;
        this.activeEditTarefa = false;
        this.toastParams = ['', 4000];
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.showNothing = false;
        this.convocacoes = new ConvocacaoBuilder().initializeList( null )
        this.objetos = new Map<string, Array<SugestaoAgendamentoDto>>();
        this.selectedObjetos = new Array<SugestaoAgendamentoDto>();
        this.modalConfirm = new EventEmitter<string | MaterializeAction>();
        
        this.calendarOptions = {
            height: 'parent',
            fixedWeekCount: false,
            defaultDate: Date.now(),
            locale: 'pt-br',
            eventClick: function( event, jsEvent, view ) {
                component.selectedObjetos = component.objetos.get(event["start"]["_i"]);
                component.openModal();
            },
            navLinks: true,
            customButtons: {
                proximo: {
                    text: '>',
                    click: function() {
                        $( "angular2-fullcalendar" ).fullCalendar( 'next' );
                    }
                },
                anterior: {
                    text: '<',
                    click: function() {
                        $( "angular2-fullcalendar" ).fullCalendar( 'prev' );
                    }
                }
            },
            header:
            {
                left: 'anterior today proximo',
                center: 'title',
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: []
        };
    }

    ngOnInit() {
        this.sugestaoAgendamentoService.getTipoConvocacoes().then( res => {
            this.tipoConvocacoes = Object.keys( res.json() ).sort();
            let convocacaoFilter: ConvocacaoFilter = new ConvocacaoFilter();
            convocacaoFilter.setTipo( this.tipoConvocacoes[5] );
            convocacaoFilter.setPageNumber( 1 );
            convocacaoFilter.setPageSize( Math.pow( 2, 31 ) - 1 );
            this.sugestaoAgendamentoService.getConvocacaoService().list( convocacaoFilter )
                .then( res => {
                    this.convocacoes = new ConvocacaoBuilder().cloneList( res.json().list );
                } )
                .catch( error => {
                    console.log( error );
                } )
        } )
    }

    openModal() {
        this.modalConfirm.emit( { action: "modal", params: ["open"] } );
    }

    cancel() {
        this.modalConfirm.emit( { action: "modal", params: ["close"] } );
    }

    selectConvocacao() {
        let component = this;
        if ( this.convocacaoId == undefined ) {
            this.toastParams = ["Por favor, escolha um servi&ccedil;o.", 4000];
            this.globalActions.emit( 'toast' );
        } else {
            this.sugestaoAgendamentoService.getSugestoes( this.convocacaoId )
                .then( res => {
                    let o = this.buildEvents( res.json() );
                    $( 'angular2-fullcalendar' ).fullCalendar( 'removeEvents' );
                    this.calendarOptions["events"] = o;
                    $( 'angular2-fullcalendar' ).fullCalendar( 'renderEvents', o, true );
                    $( 'angular2-fullcalendar' ).fullCalendar( 'gotoDate', o[1]['start'].split( '-' )[0] + '-' + o[1]['start'].split( '-' )[1] + '-' + '01' );
                } )
                .catch( error => {
                    console.log( "Erro ao retornar agenda periodico: " + error );
                } )
        }
    }

    buildEvents( lista ) {
        if ( this.showNothing ) return [{}];
        let o = [];
        let sugs: Array<SugestaoAgendamentoDto> = new SugestaoAgendamentoReportBuilder().cloneList( lista );
        sugs.forEach( t => {
            let obj: Object = {};
            obj["title"] = t.getNome() + "\n" + t.getGerencia() + " - Data do Aso: " + t.getData();
            obj["start"] = t.getSugestao();
            o.push( obj );
            if ( this.objetos.has(obj["start"]) )
                this.objetos.get(obj["start"]).push(t)
            else {
                let array: Array<SugestaoAgendamentoDto> = new Array<SugestaoAgendamentoDto>();
                array.push(t);
                this.objetos.set(obj["start"], array);
            }
        } )
        return o;
    }
}