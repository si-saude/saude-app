import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { FilaAtendimentoOcupacionalFilter } from './../fila-atendimento-ocupacional/fila-atendimento-ocupacional.filter';
import { Atendimento } from './../../model/atendimento';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoFilter } from './atendimento.filter';
import { AtendimentoBuilder } from './atendimento.builder';
import { AtendimentoGuard } from './../../guards/guards-child/atendimento.guard';
import { GenericListComponent } from './../../generics/generic.list.component';
import { DateFilter } from './../../generics/date.filter';

@Component( {
    selector: 'app-atendimento',
    templateUrl: './atendimento.component.html',
    styleUrls: ['./atendimento.component.css', '../../../assets/css/list-component.css']
} )
export class AtendimentoComponent extends GenericListComponent<Atendimento, AtendimentoFilter, AtendimentoGuard> {
    atendimento: Atendimento;
    atendimentoService: AtendimentoService;
    globalActions;
    toastParams;
    
    constructor( service: AtendimentoService, atendimentoGuard: AtendimentoGuard, router: Router ) {
        let atendimentoFilter: AtendimentoFilter = new AtendimentoFilter();
        
        atendimentoFilter.getTarefa().setStatus("EXECUCAO");
        
        super( service, atendimentoFilter, atendimentoGuard, router );
        this.atendimentoService = service;
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
    }
    
    pausar(atendimento: Atendimento) {
        let atend: Atendimento = new AtendimentoBuilder().clone(atendimento);
        
        if ( atend.getFilaAtendimentoOcupacional() != undefined ) {
            this.atendimentoService.pausar( atend.getFilaAtendimentoOcupacional() )
                .then( res => {
                    this.toastParams = ["Fila de atendimento pausada", 4000];
                    this.globalActions.emit( 'toast' );
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                } )
                .catch( error => {
                    this.catchConfiguration(error);
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        } else {
            console.log( "Fila de atendimento nao preenchida." )
        }
    }
    
    finalizar(atendimento: Atendimento) {
        let atend: Atendimento = new AtendimentoBuilder().clone(atendimento);
    
        if ( atend.getId() > 0 ) {
            this.atendimentoService.finalizar( atend )
                .then( res => {
                    this.toastParams = ["Atendimento finalizado", 4000];
                    this.globalActions.emit( 'toast' );
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                } )
                .catch( error => {
                    this.catchConfiguration(error);
                    this.toastParams = [error.text(), 4000];
                    this.globalActions.emit( 'toast' );
                } )
        }
    }
    
}