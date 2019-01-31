import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Triagem } from './../../model/triagem';
import { Diagnostico } from './../../model/diagnostico';
import { DiagnosticoBuilder } from './../../controller/diagnostico/diagnostico.builder';
import { Intervencao } from './../../model/intervencao';
import { IntervencaoBuilder } from './../../controller/intervencao/intervencao.builder';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../../controller/equipe/equipe.builder';

@Component( {
    selector: 'app-planejamento',
    templateUrl: './planejamento.html',
    styleUrls: ['./planejamento.css']
} )
export class PlanejamentoComponent{
    @Input() triagens;
    @Input() service;
    @Input() idEquipe;
    
    private innerTriagens;
    private innerService;
    private innerIdEquipe;
    
    private prazos: Array<string>;
    
    private flagIdTriagem: Triagem;
    private activeDiagnostico:boolean;
    private activeIntervencao:boolean;
    private innerIdEquipeProfissional: number;
    
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
        if ( changes["idEquipe"] != undefined ) {
            this.innerIdEquipe = changes["idEquipe"].currentValue;
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
        this.flagIdTriagem = triagem;
    }
    
    selectDiagnostico( diagnostico: Diagnostico ) {
        this.flagIdTriagem.setDiagnostico(diagnostico);
        this.showModalDiagnostico = false; 
    }
    
    cancelarModalDiagnostico() {
        this.showModalDiagnostico = false;
    }
    
    openModalIntervencao( triagem: Triagem ) {
        this.activeDiagnostico = false;
        this.activeIntervencao = true;
        this.showModalIntervencao = true;
        this.flagIdTriagem = triagem;
    }
    
    selectIntervencao( intervencao: Intervencao) {
        this.flagIdTriagem.setIntervencao(intervencao);
        this.showModalIntervencao = false;
    }
    
    cancelarModalIntervencao( valor ) {
        this.showModalIntervencao = false;
    }
    
    openModalEquipe( triagem: Triagem ) {
        this.flagIdTriagem = triagem;
        this.showModalEquipe = true;
    }
    
    selectEquipe( equipe: Equipe ) {
        this.flagIdTriagem.setEquipeAbordagem(equipe);
        this.showModalEquipe = false;
    }
    
    getIndiceDescricao( triagem: Triagem ) {
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];
    }
    
    cancelarModalEquipe( valor ) {
        this.showModalEquipe = false;
    }
    
    clearDiagnostico( triagem: Triagem ) {
        triagem.setDiagnostico(new DiagnosticoBuilder().initialize(null));
    }
    
    clearIntervencao( triagem: Triagem ) {
        triagem.setIntervencao(new IntervencaoBuilder().initialize(null));
    }
    
    clearEquipeAbordagem( triagem: Triagem ) {
        triagem.setEquipeAbordagem(new EquipeBuilder().initialize(null));
    }
}