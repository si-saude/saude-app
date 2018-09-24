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
import { GlobalVariable } from './../../../../src/app/global';
import { AtendimentoService } from './../../controller/atendimento/atendimento.service';
import { Atendimento } from './../../model/atendimento';
import { Util } from './../../generics/utils/util';

@Component( {
    selector: 'app-modal-fila-atendimento-ocupacional',
    templateUrl: './modal-fila-atendimento-ocupacional.html',
    styleUrls: ['./modal-fila-atendimento-ocupacional.css']
} )
export class ModalFilaAtendimentoOcupacionalComponent {

    @Input() service: AtendimentoService;
    @Input() model : Atendimento;
    @Input() profissional: Profissional;
    @Input() showModalFilaAtendimentoOcupacional: boolean;
    @Output() setTarefaFilter : EventEmitter<DateFilter> = new EventEmitter();
    filaAtendimentoOcupacional: EventEmitter<FilaAtendimentoOcupacional>;
    private arrayFilaAtendimentoOcupacional: Array<FilaAtendimentoOcupacional>;
    private filter: FilaAtendimentoOcupacionalFilter = new FilaAtendimentoOcupacionalFilter();
    modalFilaAtendimentoOcupacional;
    modelParams;
    private localizacoes: Array<Localizacao>;
    private profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
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
    
    setProfissionalFilter(){
        this.profissionalFilter.setId( this.profissional.getId());
        this.filter.setProfissional( this.profissionalFilter );        
    }
    
    
    addFilaAtendimento(){
        if(this.verificarCampos()){
            this.setProfissionalFilter();
            this.service.getFilaAtendimentoOcupacionalService().saveModalFilaAtendimentoOcupacional(this.filter)
            .then( res => {
                    this.buscarFilaAtendimentosOcupacionais();                    
                } )
                .catch( error => {
                    console.log( "Erro ao buscar a Fila de Atendimento Ocupacional" );
                } )
        }
    }

    selectFilaAtendimentoOcupacional( filaAtendimentoOcupacional: FilaAtendimentoOcupacional ) {
        this.service.getLocalizacaoService().get(this.filter.getLocalizacao().getId())
        .then( res => {
            filaAtendimentoOcupacional.setLocalizacao(new LocalizacaoBuilder().clone(res.json()));
            this.model.setFilaAtendimentoOcupacional( filaAtendimentoOcupacional );
            this.modalFilaAtendimentoOcupacional.emit( { action: "modal", params: ['close'] } );
        } )
        .catch( error => {
            console.log( "Erro ao buscar A Localização");
        } )       
        
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
            this.setProfissionalFilter();
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
        if (Util.isNotNull(this.filter.getLocalizacao()) && Util.isNotNull(this.filter.getLocalizacao().getId()) &&
            Util.isNotNull(this.filter.getInicio().getInicio()) &&Util.isNotNull(this.filter.getInicio().getFim())) {
                this.setTarefaFilter.emit(this.filter.getInicio());            
                return true;
        } else
            return false;
    }

}