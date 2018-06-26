import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'fullcalendar';
import { MaterializeAction } from "angular2-materialize";
import * as moment from 'moment';

import { AgendaService } from './agenda.service';
import { Usuario } from './../model/usuario';
import { UsuarioBuilder } from './../controller/usuario/usuario.builder';
import { UsuarioFilter } from './../controller/usuario/usuario.filter';
import { Tarefa } from './../model/tarefa';
import { TarefaFilter } from './../controller/tarefa/tarefa.filter';
import { TarefaBuilder } from './../controller/tarefa/tarefa.builder';
import { Profissional } from './../model/profissional';
import { ProfissionalSaudeFilter } from './../controller/profissional-saude/profissional-saude.filter';
import { ProfissionalSaudeBuilder } from './../controller/profissional-saude/profissional-saude.builder';
import { Empregado } from './../model/empregado';
import { EmpregadoFilter } from './../controller/empregado/empregado.filter';
import { EmpregadoBuilder } from './../controller/empregado/empregado.builder';
import { Equipe } from './../model/equipe';
import { EquipeBuilder } from './../controller/equipe/equipe.builder';
import { EquipeFilter } from './../controller/equipe/equipe.filter';
import { DateFilter } from './../generics/date.filter';

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
    profissional: Profissional;
    usuario: Usuario;
    tarefaFilter: TarefaFilter;
    showNothing: boolean;
    coordenador: Empregado;
    activeEditTarefa: boolean;
    firtTime: boolean;

    constructor( router: Router, private agendaService: AgendaService ) {
        let component = this;
        this.firtTime = false;
        this.activeEditTarefa = false;
        this.tarefaFilter = new TarefaFilter();
        this.toastParams = ['', 4000];
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.showNothing = false;
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
            eventClick: function(calEvent, jsEvent, view) {
                setTimeout(() => {
                    if ( component.activeEditTarefa ) {
                        localStorage.setItem("tarefa-id", calEvent["id"]);
                        console.log('open');
                        window.open("/tarefa");                        
                    }
                }, 200);
            },
            customButtons: {
                proximo: {
                    text: '>',
                    click: function() {
                        $("angular2-fullcalendar").fullCalendar('next');
//                        component.moveDate();
                    }
                },
                anterior: {
                    text: '<',
                    click: function() {
                        $("angular2-fullcalendar").fullCalendar('prev');
//                        component.moveDate();
                    }
                }
            },
            header:
            {
                left: 'anterior today proximo',
                center: 'title',
                right: 'month,agendaWeek,agendaDay',
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: function(start, end, timezone, callback) {
                if ( localStorage.getItem( 'usuario-id' ) != undefined ) {
                    component.agendaService.getUsuario( Number( localStorage.getItem( 'usuario-id' ) ) )
                        .then( res => {
                            component.usuario = new UsuarioBuilder().clone( res.json() );
                            let mInicial: Date = moment(start).toDate();
                            let mFinal: Date = moment(end).toDate();
                            let dataInicial: Date = new Date(mInicial.getFullYear(), mInicial.getMonth(), mInicial.getDate(), 0,0,0);
                            let dataFinal: Date = new Date(mFinal.getFullYear(), mFinal.getMonth(), mFinal.getDate(), 0,0,0);
                            component.tarefaFilter.setPageSize((2**31)-1);
                            component.tarefaFilter.setInicio(new DateFilter());
                            component.tarefaFilter.getInicio().setInicio(dataInicial);
                            component.tarefaFilter.getInicio().setFim(dataFinal);
                            component.tarefaFilter.getInicio().setTypeFilter("ENTRE");
                            if ( component.usuario.getGestorCss() ) {
                                component.activeEditTarefa = true;
                                component.agendaService.list( component.tarefaFilter )
                                    .then( res => {
                                        callback(component.buildEvents(res.json()));
                                    } )
                                    .catch( error => {
                                        console.log( "Erro ao retornar tarefas: "+ error);
                                        callback([]);
                                    } )
                                return;
                            } else if ( component.usuario.getId() > 0  && component.usuario.getPessoa().getId() > 0 ) {
                                let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
                                let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                                empregadoFilter.getPessoa().setCpf( component.usuario.getPessoa().getCpf() );
                                profissionalFilter.setEmpregado( empregadoFilter );
//
                                component.agendaService.getProfissional( profissionalFilter )
                                    .then( res => {
                                        component.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                        
                                        if ( component.profissional.getEquipe() == undefined || 
                                                component.profissional.getEquipe() == null ||
                                                component.profissional.getEquipe().getId() == 0) {
                                            component.showNothing = true;
                                            return;
                                        }
                                        
                                        let equipeFilter: EquipeFilter = new EquipeFilter();
                                        equipeFilter.setId( component.profissional.getEquipe().getId() );
                                        component.tarefaFilter.setEquipe( equipeFilter );
                                        
                                        component.agendaService.getEquipe( component.profissional.getEquipe().getId() )
                                            .then(res => {
                                                let e: Equipe = new EquipeBuilder().clone( res.json() );
                                                if ( e.getCoordenador().getId() == component.profissional.getId() )
                                                    component.activeEditTarefa = true;
                                                else component.activeEditTarefa = false;
                                            })
                                            .catch(error => {
                                                console.log("Erro ao retornar equipe: "+error);
                                            })
                                        
                                        if ( res.json().list[0] != undefined ) {
                                            component.agendaService.list( component.tarefaFilter )
                                                .then( res => {
                                                    $('angular2-fullcalendar').fullCalendar( 'removeEvents' );
                                                    callback(component.buildEvents(res.json()));
                                                } )
                                                .catch( error => {
                                                    console.log( "Erro ao retornar tarefas."+ error);
                                                    callback([]);
                                                } )
                                        } else {
                                            console.log("Nao foi encontrado profissional")
                                        }
                                    } )
                                    .catch( error => {
                                        console.log( "Erro no servidor ao buscar o profissional." );
                                    } )
                            } else {
                                component.showNothing = true;
                                callback([]);
                            }
                        } )
                        .catch( error => {
                            console.log( "Erro no servidor ao buscar o usuario." );
                        } )
                } else { 
                    router.navigate(["login"]);
                }
            }
        };

    }

    ngOnInit() { }
    
    moveDate() {
//        $('angular2-fullcalendar').fullCalendar( 'removeEvents' );
//        $('angular2-fullcalendar').fullCalendar( 'rerenderEvents' );
        let dataInicial: Date = new Date();
        let dataFinal: Date = new Date();
        let m = moment($("angular2-fullcalendar").fullCalendar('getDate'));
        let view = $("angular2-fullcalendar").fullCalendar('getView');
        if ( view["name"] == "month" ) {
            let mDate: Date = m.toDate();
            dataInicial = new Date(mDate.getFullYear(), mDate.getMonth(), mDate.getDate(), 0,0,0);
            mDate = m.add(1, "months").add(1, "days").toDate();
            dataFinal = new Date(mDate.getFullYear(), mDate.getMonth(), mDate.getDate(), 0,0,0);
        }
        if ( view["name"] == "agendaWeek" ) {
            let mDate: Date = m.toDate();
            dataInicial = new Date(mDate.getFullYear(), mDate.getMonth(), mDate.getDate(), 0,0,0);
            mDate = m.add(1, "weeks").add(1, "days").toDate();
            dataFinal = new Date(mDate.getFullYear(), mDate.getMonth(), mDate.getDate(), 0,0,0);
        }
        if ( view["name"] == "agendaDay" ) {
            let mDate: Date = m.toDate();
            dataInicial = new Date(mDate.getFullYear(), mDate.getMonth(), mDate.getDate(), 0,0,0);
            mDate = m.add(1, "days").add(1, "days").toDate();
            dataFinal = new Date(mDate.getFullYear(), mDate.getMonth(), mDate.getDate(), 0,0,0);
        }
        this.tarefaFilter.setInicio(new DateFilter());
        this.tarefaFilter.getInicio().setInicio(dataInicial);
        this.tarefaFilter.getInicio().setFim(dataFinal);
        this.tarefaFilter.getInicio().setTypeFilter("ENTRE");
        
        if ( this.usuario.getGestorCss() ) {
            this.tarefaFilter.setEquipe(undefined);
            this.callListTarefasService( this.tarefaFilter );
            return;
        } 
        
        this.callListTarefasService( this.tarefaFilter );
    }
    
    callListTarefasService( tarefaFilter ) {
        this.agendaService.list( tarefaFilter )
            .then( res => {
                $('angular2-fullcalendar').fullCalendar( 'removeEvents' ); 
                $('angular2-fullcalendar').fullCalendar( 'addEventSource', this.buildEvents(res.json()));
            } )
            .catch( error => {
                console.log( "Erro ao retornar tarefas."+ error);
                return([]);
            } )
    }
    
    buildEvents(lista) {
        if ( this.showNothing ) return [{}];
        let o: Array<Object> = new Array<Object>();
        let trfs: Array<Tarefa> = new TarefaBuilder().cloneList(lista["list"]);
        trfs.forEach( t => {
            let obj: Object = {};
            obj["id"] = t.getId();
            obj["title"] = "Servico: " + t.getServico().getNome() + " - " +
                           "Cliente: " + t.getCliente().getPessoa().getNome() + " - " + 
                           "Equipe: " + t.getEquipe().getNome();
            obj["servico"] = t.getServico().getNome();
            obj["cliente"] = t.getCliente().getPessoa().getNome();
            obj["equipe"] = t.getEquipe().getNome();
            obj["start"] = this.buildDateTime(t.getInicio());
            obj["end"] = this.buildDateTime(t.getFim());
            o.push(obj);
        })
        return o;
    }
    
    buildEvents2() {
        let o: Array<Object> = new Array<Object>();
        o.push( {
            id: 1,
            title: 'UPDATE',
            start: '2018-02-01'
        } );
        o.push( {
            id: 2,
            title: 'UPDATE',
            start: '2018-02-01'
        } );
        
        return o;
    }
    
    buildDateTime( dateTime: Date ) {
        let dt = dateTime.toString().split("Z");
        return dt[0];
    }
    
    openTooltip( evento ) {
        let txt = "Servico: " + evento["servico"] + "<br>" +
                  "Cliente: " + evento["cliente"] + " <br> " + 
                  "Equipe: " + evento["equipe"];
        this.toastParams = [txt, 60000];
        this.globalActions.emit( 'toast' );
    }
    
    closeTooltip( event ) {
        $(".toast").remove();
    }

}