import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'fullcalendar';
import { MaterializeAction } from "angular2-materialize";

import { AgendaService } from './agenda.service';
import { Tarefa } from './../model/tarefa';
import { TarefaFilter } from './../controller/tarefa/tarefa.filter';
import { TarefaBuilder } from './../controller/tarefa/tarefa.builder';

@Component( {
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css']
} )
export class AgendaComponent implements OnInit {
    calendarOptions: Object;
    tarefas: Array<Tarefa>;
    toastParams;
    globalActions;

    constructor( router: Router, private agendaService: AgendaService ) {
        let component = this;
        this.toastParams = ['', 4000];
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.calendarOptions = {
            height: 'parent',
            fixedWeekCount: false,
            defaultDate: Date.now(),
            locale: 'pt-br',
            eventMouseover: function( event, jsEvent, view ) {
//                console.log(event);
                component.openTooltip(event);
            },
            eventMouseout: function( event ) {
//                console.log(event);
                component.closeTooltip( event );
            },
            navLinks: true,
            navLinkDayClick: function( date, jsEvent ) {
                $( 'angular2-fullcalendar' ).fullCalendar( 'changeView', 'agendaDay' );
                $( 'angular2-fullcalendar' ).fullCalendar( 'gotoDate', date );
            },
            header:
            {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay',
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: function(start, end, timezone, callback) {
                let objects: Array<Object> = new Array<Object>();
                component.agendaService.list( new TarefaFilter() )
                    .then( res => {
                        component.tarefas = new TarefaBuilder().cloneList( this.tarefas );
                        callback(component.buildEvents());
                    } )
                    .catch( error => {
                        console.log( "Erro ao retornar tarefas."+ error);
                        callback([]);
                    } )
            }
        };

    }

    ngOnInit() {

    }
    
    buildEvents() {
        let o: Array<Object> = new Array<Object>();
        o.push( {
            id: 1,
            title: 'Evento com mais de uma linha...<br> muito grande mesmo',
            start: '2018-02-02'
        } );
        o.push( {
            id: 2,
            title: 'All Day Event',
            start: '2018-02-02'
        } );
        
        return o;
    }
    
    openTooltip( evento ) {
        this.toastParams = [evento.title, 4000];
        this.globalActions.emit( 'toast' );
    }
    
    closeTooltip( event ) {
        $(".toast").remove();
    }

}
