import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'fullcalendar';
import { MaterializeAction } from "angular2-materialize";
import * as moment from 'moment';

import { AgendaPeriodicoService } from './agenda-periodico.service';
import { AgendaPeriodicoDto } from './../model/dto/agenda-periodico-dto';
import { AgendaPeriodicoBuilder } from './agenda-periodico.builder';
import { Servico } from './../model/servico';
import { ServicoBuilder } from './../controller/servico/servico.builder';
import { ServicoFilter } from './../controller/servico/servico.filter';
import { DateFilter } from './../generics/date.filter';
import { DateUtil } from './../generics/utils/date.util';

@Component( {
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css']
} )
export class AgendaPeriodicoComponent implements OnInit {
    private component = this;
    private toastParams;
    private globalActions;
    private showNothing: boolean;
    private dateUtil: DateUtil;
    private servicoId: string;
    private servicos: Array<Servico>;
    private calendarOptions: Object;
    private intervalStart;
    private intervalEnd;

    constructor( router: Router, private agendaPeriodicoService: AgendaPeriodicoService ) {
        let component = this;
        this.toastParams = ['', 4000];
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.showNothing = false;
        this.dateUtil = new DateUtil();
        this.servicos = new ServicoBuilder().initializeList(new Array<Servico>());
        this.calendarOptions = {
            height: 'parent',
            fixedWeekCount: false,
            defaultDate: Date.now(),
            locale: 'pt-br',
            eventMouseover: function( event, jsEvent, view ) {
                component.openTooltip( event );
            },
            eventMouseout: function( event, jsEvent, view ) {
                component.closeTooltip( event );
            },
            navLinks: true,
            navLinkDayClick: function( date, jsEvent ) {
                $( 'angular2-fullcalendar' ).fullCalendar( 'changeView', 'agendaDay' );
                $( 'angular2-fullcalendar' ).fullCalendar( 'gotoDate', date );
            },
            viewRender: function (view, element)
            {
                component.intervalStart = view.intervalStart;
                component.intervalEnd = view.intervalEnd;
                component.constructAgenda();
            },
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
                left: 'anterior hoje proximo',
                center: 'title',
                right: 'month,agendaWeek,agendaDay',
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: []
        };
    }

    ngOnInit() {
        let servicoFilter: ServicoFilter = new ServicoFilter();
        servicoFilter.setGrupo("ATENDIMENTO OCUPACIONAL");
        this.agendaPeriodicoService.getServicoByGrupo( servicoFilter )
            .then( res => {
                this.servicos = new ServicoBuilder().cloneList(res.json());
            } )
            .catch( error => {
                console.log( "Erro ao buscar os ufs." );
            } )
    }
    
    constructAgenda() {
        let component = this;   
        if ( this.servicoId == undefined ) {
            this.toastParams = ["Por favor, escolha um servico.", 4000];
            this.globalActions.emit( 'toast' );
        } else {
            let mInicial: Date = moment(this.intervalStart._d).toDate();
            let mFinal: Date = moment(this.intervalEnd._d).toDate();
            let dataInicioInicio: string = (mInicial.getFullYear() + "-" + (mInicial.getMonth() + 1)+ "-" + mInicial.getDate()).toString();
            let dataInicioFim: string = (mFinal.getFullYear() + "-" + (mFinal.getMonth() + 1) + "-" + mFinal.getDate()).toString();
            this.agendaPeriodicoService.getAgendaPeriodicos(dataInicioInicio, dataInicioFim, this.servicoId)
                .then( res => {
                    let o = this.buildEvents(res.json()); 
                    $('angular2-fullcalendar').fullCalendar( 'removeEvents' );
                    this.calendarOptions["events"] = o;
                    $( 'angular2-fullcalendar' ).fullCalendar( 'renderEvents', o, true );
                } )
                .catch( error => {
                    console.log( "Erro ao retornar agenda periodico: "+ error);
                } )
        }
    }
    
    buildEvents( lista ) {
        if ( this.showNothing ) return [{}];
        let o = [];
        let trfs: Array<AgendaPeriodicoDto> = new AgendaPeriodicoBuilder().cloneList( lista );
        trfs.forEach( t => {
            let obj: Object = {};
            if ( t.getStatus().includes( "FINALIZADO" ) )
                obj["color"] = "#000";
            else if ( t.getStatus().includes( "CANCELADA" ) )
                obj["color"] = "#ff0000";
            else if ( t.getStatus().includes( "PENDENTE" ) ) {
                obj["color"] = "#ffff00";
                obj["textColor"] = "#000";
                obj["pendencias"] = t.getPendencias();
            }
            obj["id"] = t.getEmpregadoId();
            obj["title"] = t.getEmpregadoNome();
            obj["start"] = this.dateUtil.transformDateToDateAgenda( t.getData() );
            obj["status"] = t.getStatus();
            obj["nomeServico"] = t.getNomeServico();
            o.push( obj );
        } )
        return o;
    }

    selectServico() {
        this.constructAgenda();
    }

    openTooltip( evento ) {
        let txt = "Empregado: " + evento["title"] + "</br>" +
                  "Status: " + evento["status"];
        if ( evento["status"] == "PENDENTE" )
            txt += "</br>" + "Pendencias: " +evento["pendencias"];
        this.toastParams = [txt, 6000];
        this.globalActions.emit( 'toast' );
    }

    closeTooltip( event ) {
        $( ".toast" ).remove();
    }

}