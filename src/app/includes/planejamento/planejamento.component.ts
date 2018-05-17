import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Triagem } from './../../model/triagem';
import { Diagnostico } from './../../model/diagnostico';
import { Intervencao } from './../../model/intervencao';
import { Equipe } from './../../model/equipe';

@Component( {
    selector: 'app-planejamento',
    templateUrl: './planejamento.html',
    styleUrls: ['./planejamento.css']
} )
export class PlanejamentoComponent{
    @Input() triagens;
    @Input() service;
    
    private innerTriagens;
    private innerService;
    
    private prazos: Array<string>;
    
    private flagIdTriagem: number;
    private activeDiagnostico:boolean;
    private activeIntervencao:boolean;
    
    private showModalDiagnostico: boolean;
    private showModalIntervencao: boolean;
    private showModalEquipe: boolean;
    
    constructor( router: Router ) {
    }
    
    ngOnInit() {
        this.getPrazos();
    }
    
    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["service"] != undefined ) {
            this.innerService = changes["service"].currentValue;
        }
        if ( changes["triagens"] != undefined ) {
            this.innerTriagens = changes["triagens"].currentValue;
        }
    }
    
    getPrazos() {
        this.innerService.getPrazos()
            .then( res => {
                this.prazos = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( "Erro ao retornar os prazos." );
            } )
    }
    
    verifyIndiceTriagem( triagem: Triagem ) {
        if ( triagem.getIndice() > -1 ) return true;

        return false;
    }
    

    planejamentoBackground( triagem: Triagem ) {
        if ( triagem.getIndice() <= 2 )
            return 'red';
    }
    
    openModalDiagnostico( triagem: Triagem ) {
        this.activeDiagnostico = true;
        this.activeIntervencao = false;
        this.showModalDiagnostico = true;
        this.flagIdTriagem = triagem.getId();
    }
    
    selectDiagnostico( diagnostico: Diagnostico ) {
        let triagem = this.innerTriagens.find(t => t.getId() == this.flagIdTriagem);
        triagem.setDiagnostico(diagnostico);
        this.showModalDiagnostico = false; 
    }
    
    cancelarModalDiagnostico() {
        this.showModalDiagnostico = false;
    }
    
    openModalIntervencao( triagem: Triagem ) {
        this.activeDiagnostico = false;
        this.activeIntervencao = true;
        this.showModalIntervencao = true;
        this.flagIdTriagem = triagem.getId();
    }
    
    selectIntervencao( intervencao: Intervencao) {
        let triagem = this.innerTriagens.find(t => t.getId() == this.flagIdTriagem);
        triagem.setIntervencao(intervencao);
        this.showModalIntervencao = false;
    }
    
    cancelarModalIntervencao( valor ) {
        this.showModalIntervencao = false;
    }
    
    openModalEquipe( triagem: Triagem ) {
        this.flagIdTriagem = triagem.getId();
        this.showModalEquipe = true;
    }
    
    selectEquipe( equipe: Equipe ) {
        let triagem = this.innerTriagens.find(t => t.getId() == this.flagIdTriagem);
        triagem.setEquipeAbordagem(equipe);
        this.showModalEquipe = false;
    }
    
    getIndiceDescricao( triagem: Triagem ) {
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];
    }
    
    cancelarModalEquipe( valor ) {
        this.showModalEquipe = false;
    }
    
}