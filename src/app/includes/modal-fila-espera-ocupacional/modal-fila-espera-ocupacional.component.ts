import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';
import * as moment from 'moment';

import { FilaEsperaOcupacionalBuilder } from './../../controller/fila-espera-ocupacional/fila-espera-ocupacional.builder';
import { FilaEsperaOcupacionalFilter } from './../../controller/fila-espera-ocupacional/fila-espera-ocupacional.filter';
import { FilaEsperaOcupacional } from './../../model/fila-espera-ocupacional';
import { Localizacao } from './../../model/localizacao';
import { LocalizacaoBuilder } from './../../controller/localizacao/localizacao.builder';
import { LocalizacaoFilter } from './../../controller/localizacao/localizacao.filter';
import { Servico } from './../../model/servico';
import { ServicoBuilder } from './../../controller/servico/servico.builder';
import { ServicoFilter } from './../../controller/servico/servico.filter';
import { EmpregadoFilter } from './../../controller/empregado/empregado.filter';
import { Profissional } from './../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../controller/profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../controller/profissional-saude/profissional-saude.filter';
import { DateFilter } from './../../generics/date.filter';
import { IMyDpOptions } from 'mydatepicker';
import { EmpregadoNomeAutocomplete } from './../../controller/empregado/empregado-nome.autocomplete';
import { DateUtil } from './../../generics/utils/date.util';
import { FilaEsperaOcupacionalService } from './../../controller/fila-espera-ocupacional/fila-espera-ocupacional.service';
import { AtendimentoService } from './../../controller/atendimento/atendimento.service';

@Component( {
    selector: 'app-modal-fila-espera-ocupacional',
    templateUrl: './modal-fila-espera-ocupacional.html',
    styleUrls: ['./modal-fila-espera-ocupacional.css']
} )
export class ModalFilaEsperaOcupacionalComponent {

    @Input() service: AtendimentoService ;
    @Input() periodo: Date;
    @Input() localizacaoFilter: LocalizacaoFilter;
    @Input() model;
    @Input() showModalFilaEsperaOcupacional: boolean;
    filaEsperaOcupacional: EventEmitter<FilaEsperaOcupacional>;
    private arrayFilaEsperaOcupacional: Array<FilaEsperaOcupacional>;
    private filter: FilaEsperaOcupacionalFilter = new FilaEsperaOcupacionalFilter();
    modalFilaEsperaOcupacional;
    modelParams;
    private profissional: Profissional;
    private servicos: Array<Servico>;
    private empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
    private autoCompleteEmpregado: EmpregadoNomeAutocomplete;
    protected dateUtil: DateUtil;
    showConfirmSave;
    msgConfirmSave;
    
    constructor( router: Router,
        private filaEsperaOcupacionalService: FilaEsperaOcupacionalService ) {
        this.modalFilaEsperaOcupacional = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.showConfirmSave = false;
        this.msgConfirmSave = "";
        
        this.servicos = new ServicoBuilder().initializeList( this.servicos );
        this.filaEsperaOcupacional = new EventEmitter<FilaEsperaOcupacional>();
        this.filter.setServico( new ServicoFilter() );
        this.filter.setEmpregado( new EmpregadoFilter() );
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.dateUtil = new DateUtil();
        this.filter.setHorarioCheckin( new DateFilter() );
        this.filter.getHorarioCheckin().setTypeFilter( "ENTRE" );
        this.filter.setPageSize( Math.pow( 2, 31 ) - 1 );
    }

    ngOnInit() {
        this.arrayFilaEsperaOcupacional = new FilaEsperaOcupacionalBuilder().initializeList( new Array<FilaEsperaOcupacional>() );
        this.getServicos();
        this.autoCompleteEmpregado = new EmpregadoNomeAutocomplete( this.service.getEmpregadoService() );
    }

    openModalFilaEsperaOcupacional() {
        this.modalFilaEsperaOcupacional.emit( { action: "modal", params: ['open'] } );
    }
    getServicos() {
        
        let servicoFilter: ServicoFilter = new ServicoFilter();
        servicoFilter.setGrupo("ATENDIMENTO OCUPACIONAL");     
        this.service.getServicosService().selectList(servicoFilter)
            .then( res => {
                this.servicos = new ServicoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( "Erro ao retornar os Servicos." );
            } )
    }

    selectFilaEsperaOcupacional( filaEsperaOcupacional: FilaEsperaOcupacional ) {
        this.model.setFilaEsperaOcupacional( filaEsperaOcupacional );
        this.modalFilaEsperaOcupacional.emit( { action: "modal", params: ['close'] } );
    }

    cancelarModalFilaEsperaOcupacional() {
        this.showModalFilaEsperaOcupacional = false;
        this.modalFilaEsperaOcupacional.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalFilaEsperaOcupacional.emit( { action: "modal", params: ["close"] } );
    }
    
    addFilaEspera(){
        this.showConfirmSave = false;
        if(this.verificarCampos()){
            this.filaEsperaOcupacionalService.saveModalFilaEsperaOcupacional(this.filter)
            .then( res => {
                    this.buscarFilaEsperasOcupacionais();  
                } )
                .catch( error => {
                    this.msgConfirmSave = error._body;
                    this.buscarFilaEsperasOcupacionais();  
                    this.showConfirmSave = true;
                } )
        }
    }
    
    
    buscarFilaEsperasOcupacionais() {
        if ( this.verificarCampos() ) {         
            this.filaEsperaOcupacionalService.list( this.filter )
                .then( res => {
                    this.arrayFilaEsperaOcupacional = new FilaEsperaOcupacionalBuilder().cloneList( res.json().list );
                } )
                .catch( error => {
                    console.log( "Erro ao buscar a Fila de Espera Ocupacional" );
                } )
        }
    }   
    
    
    setFilterFilaEsperaOcupacional(){
        
        this.empregadoFilter.setId( this.profissional.getEmpregado().getId());
        this.filter.setEmpregado( this.empregadoFilter );
        this.filter.setLocalizacao( this.localizacaoFilter );
        this.filter.getHorarioCheckin().setInicio( this.periodo );
        this.filter.getHorarioCheckin().setFim( this.periodo );
        
    }

    verificarCampos() {
        if ( this.filter.getServico().getId() == 0 ||
             this.profissional.getEmpregado().getId() == 0) {
             return false;
        } else {
            this.setFilterFilaEsperaOcupacional();
            return true;            
        }
    }
}