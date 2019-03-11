import { EventEmitter, SimpleChanges, Component, Input, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { AvaliacaoHigieneOcupacional } from './../../model/avaliacao-higiene-ocupacional';
import { GlobalVariable } from './../../global';

@Component( {
    selector: 'app-informacao-avaliacao-higiene-ocupacional',
    templateUrl: './informacao-avaliacao-higiene-ocupacional.html',
    styleUrls: ['./informacao-avaliacao-higiene-ocupacional.css']
} )
export class InformacaoAvaliacaoHigieneOcupacionalComponent{
    
    @Input() avaliacaoHigieneOcupacional: AvaliacaoHigieneOcupacional;
    @Input() service;
    protected globalActions;
    protected toastParams;
    private ensaioVedacoes: Array<string>;
    
    constructor( router: Router ) {
    }
    
    ngOnInit() {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];  
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
    
    getEnsaioVedacao() {
        if ( this.avaliacaoHigieneOcupacional.getEnsaioVedacao() == undefined ) return "";
        else if ( this.avaliacaoHigieneOcupacional.getEnsaioVedacao().includes("APLIC") )
            return "naoAplicavel";
        else if ( this.avaliacaoHigieneOcupacional.getEnsaioVedacao().includes("N") )
            return "nao";
        else return "sim";
    }
    
    setEnsaioVedacao( value ) {
        switch(value) {
            case "nao":
                this.avaliacaoHigieneOcupacional.setEnsaioVedacao(this.ensaioVedacoes[0]);
                break;
            case "naoAplicavel":
                this.avaliacaoHigieneOcupacional.setEnsaioVedacao(this.ensaioVedacoes[1]);
                break;
            case "sim":
                this.avaliacaoHigieneOcupacional.setEnsaioVedacao(this.ensaioVedacoes[2]);
                break;
        }
    }
} 