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

@Component( {
    selector: 'app-modal-fila-atendimento-ocupacional',
    templateUrl: './modal-fila-atendimento-ocupacional.html',
    styleUrls: ['./modal-fila-atendimento-ocupacional.css']
} )
export class ModalFilaAtendimentoOcupacionalComponent {
    @Input() service;
    @Input() profissional: Profissional;
    @Input() showModalFilaAtendimentoOcupacional: boolean;
    @Output() filaAtendimentoOcupacional: EventEmitter<FilaAtendimentoOcupacional>;
    private arrayFilaAtendimentoOcupacional: Array<FilaAtendimentoOcupacional>;
    private filter : FilaAtendimentoOcupacionalFilter = new FilaAtendimentoOcupacionalFilter();
    modalFilaAtendimentoOcupacional;
    modelParams;
    private localizacoes: Array<Localizacao>;    
    private profissionalFilter : ProfissionalSaudeFilter  = new ProfissionalSaudeFilter();

    constructor( router: Router ) {
        this.modalFilaAtendimentoOcupacional = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.filaAtendimentoOcupacional = new EventEmitter<FilaAtendimentoOcupacional>();
        this.filter.setLocalizacao(new LocalizacaoFilter())
    }
    
    ngOnChanges( changes: SimpleChanges ) {
//        if ( changes["showModalFilaAtendimentoOcupacional"] != undefined && changes["showModalFilaAtendimentoOcupacional"].currentValue === true )
//            setTimeout(() => this.openModalFilaAtendimentoOcupacional(), 1 );
        
        this.getLocalizacoes();
    }

    ngOnInit() {
        this.arrayFilaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initializeList( new Array<FilaAtendimentoOcupacional>() );

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
        this.filaAtendimentoOcupacional.emit( filaAtendimentoOcupacional );
        this.modalFilaAtendimentoOcupacional.emit( { action: "modal", params: ['close'] } );
    }

    cancelarModalFilaAtendimentoOcupacional() {
        this.showModalFilaAtendimentoOcupacional = false;
        this.modalFilaAtendimentoOcupacional.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalFilaAtendimentoOcupacional.emit( { action: "modal", params: ["close"] } );
    }
    
    buscarFilaAtendimentosOcupacionais()
    {            
        this.profissionalFilter.setId(this.profissional.getId());    
        this.filter.setProfissional(this.profissionalFilter);
          this.service.getListFilaAtendimentoOcupacional( this.filter )
              .then( res => {
                  this.arrayFilaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().cloneList( res.json().list);                 
                  console.log(this.arrayFilaAtendimentoOcupacional);
              } )
              .catch( error => {
                  console.log( "Erro ao buscar a Fila de Atendimento Ocupacional" );
              })
    }
}