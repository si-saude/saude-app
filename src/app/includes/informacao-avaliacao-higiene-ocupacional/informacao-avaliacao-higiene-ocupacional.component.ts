import { EventEmitter, SimpleChanges, Component, Input, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Atendimento } from './../../model/atendimento';
import { AtendimentoBuilder } from './../../controller/atendimento/atendimento.builder';
import { GlobalVariable } from './../../global';
import { Util } from './../../generics/utils/util';

@Component( {
    selector: 'app-informacao-avaliacao-higiene-ocupacional',
    templateUrl: './informacao-avaliacao-higiene-ocupacional.html',
    styleUrls: ['./informacao-avaliacao-higiene-ocupacional.css']
} )
export class InformacaoAvaliacaoHigieneOcupacionalComponent{
    
    @Input() atendimento: Atendimento;
    @Input() service;
    protected globalActions;
    protected toastParams;
    private ensaioVedacoes: Array<string> = new Array<string>();
    private tipoRespiradores: Array<string> = new Array<string>();
    private tamanhoRespiradores: Array<string> = new Array<string>();
    
    constructor( router: Router ) {
        
    }
    
    ngOnInit() {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.getEnsaioVedacoes();
        this.setConcordaAprho();
        this.getTipoRespiradores();
        this.getTamanhoRespiradores();
    }
    
    getEnsaioVedacoes() {
        this.service.getEnsaioVedacao()
            .then(res => {
                this.ensaioVedacoes = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao buscar os ensaios vedacoes.");
            })
    }
    
    getTipoRespiradores() {
        this.service.getTipoRespiradores()
            .then(res => {
                this.tipoRespiradores = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao buscar os tipos de respiradores.");
            })
    }
    
    getTamanhoRespiradores() {
        this.service.getTamanhoRespiradores()
            .then(res => {
                this.tamanhoRespiradores = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao buscar os tamanho de respiradores.");
            })
    }
    
    getValueEnsaioVedacao(value) {
        switch(value) {
            case "nao":
                return this.ensaioVedacoes[0];
            case "sim":
                return this.ensaioVedacoes[2];
            case "naoAplicavel":
                return this.ensaioVedacoes[1];
        }
    }
    
    ensaioVedacao(){    
        if (this.atendimento.getAvaliacaoHigieneOcupacional().getBrigada() || this.atendimento.getAvaliacaoHigieneOcupacional().getEspacoConfinado() ||
                this.atendimento.getAvaliacaoHigieneOcupacional().getFiscalSopSg() || this.atendimento.getAvaliacaoHigieneOcupacional().getOpEcolEcomp()||
                this.atendimento.getAvaliacaoHigieneOcupacional().getUsoVoluntario() || this.atendimento.getAvaliacaoHigieneOcupacional().getOutros()){
                return true;           
        }else{
            this.setEnsaioVedacao("naoAplicavel");
            return false;    
        }
    }
    getEnsaioVedacao() {
        if ( this.atendimento.getAvaliacaoHigieneOcupacional().getEnsaioVedacao() == undefined ) return "";
        else if ( this.atendimento.getAvaliacaoHigieneOcupacional().getEnsaioVedacao().includes("APLIC") )
            return "naoAplicavel";
        else if ( this.atendimento.getAvaliacaoHigieneOcupacional().getEnsaioVedacao().includes("N") )
            return "nao";
        else return "sim";
    }
    
    setEnsaioVedacao( value ) {
        switch(value) {
            case "nao":
                this.setFalseJustificativaVedacao();
                this.atendimento.getAvaliacaoHigieneOcupacional().setEnsaioVedacao(this.ensaioVedacoes[0]);
                break;
            case "naoAplicavel":
                this.setFalseJustificativaVedacao();
                this.atendimento.getAvaliacaoHigieneOcupacional().setEnsaioVedacao(this.ensaioVedacoes[1]);
                
                break;
            case "sim":
                this.atendimento.getAvaliacaoHigieneOcupacional().setEnsaioVedacao(this.ensaioVedacoes[2]);
                break;
        }
    }
    
    setFalseJustificativaVedacao(){
        $('#naoConcordaAtividades').prop('checked', false);
        $('#naoConcordaFrequenciaExposicaoRiscos').prop('checked', false);
        $('#naoConcordaCategoriaRiscos').prop('checked', false);
        
        this.atendimento.getAvaliacaoHigieneOcupacional().setNaoBarbeado(false);
        this.atendimento.getAvaliacaoHigieneOcupacional().setNaoUtilizaMascara(false);
        this.atendimento.getAvaliacaoHigieneOcupacional().setTesteSensibilidadeInsatisfatorio(false);        
    }
    
    setConcordaAprho(){
        var value = $('#concordaAprho').is(":checked");
        if(value || this.atendimento.getAvaliacaoHigieneOcupacional().getConcordaDescricaoAprhoGhe()){  
            
            this.atendimento.getAvaliacaoHigieneOcupacional().setNaoConcordaCategoriaRiscos(false);
            this.atendimento.getAvaliacaoHigieneOcupacional().setNaoConcordaFrequenciaExposicaoRiscos(false);
            this.atendimento.getAvaliacaoHigieneOcupacional().setNaoConcordaAtividades(false);
            this.atendimento.getAvaliacaoHigieneOcupacional().setNaoConcordaAgentesRiscos(false);
            
            $('#nao-concorda-agentes-riscos').prop('checked', false);
            $('#naoConcordaAtividades').prop('checked', false);
            $('#naoConcordaFrequenciaExposicaoRiscos').prop('checked', false);
            $('#naoConcordaCategoriaRiscos').prop('checked', false);
        }                
    }
    downloadRelatorioAvaliacao(){   
        
        this.service.getRelatorioAvaliacaoHo( new AtendimentoBuilder().clone( this.atendimento ))
            .then(res => {
                Util.baixar( res, this.atendimento.getFilaEsperaOcupacional().getEmpregado().getMatricula().trim()+".pdf","pdf" );
            })
            .catch(error => {
                console.log(error);
            })
      }
    
    downloadRelatorioEnsaioVedacao(){   
        this.service.getRelatorioEnsaioVedacao( new AtendimentoBuilder().clone( this.atendimento ))
            .then(res => {
                Util.baixar( res, this.atendimento.getFilaEsperaOcupacional().getEmpregado().getMatricula().trim()+".pdf","pdf" );
            })
            .catch(error => {
                console.log(error);
            })
      }
} 