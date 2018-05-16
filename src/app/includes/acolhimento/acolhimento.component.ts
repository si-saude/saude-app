import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Triagem } from './../../model/triagem';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../../controller/equipe/equipe.builder';
import { Diagnostico } from './../../model/diagnostico';
import { DiagnosticoBuilder } from './../../controller/diagnostico/diagnostico.builder';
import { Intervencao } from './../../model/intervencao';
import { IntervencaoBuilder } from './../../controller/intervencao/intervencao.builder';
import { Atendimento } from './../../model/atendimento';

@Component( {
    selector: 'app-acolhimento',
    templateUrl: './acolhimento.html',
    styleUrls: ['./acolhimento.css']
} )
export class AcolhimentoComponent{
    @Input() triagensTodosAtendimentos;
    @Input() service;
    @Input() atendimento;
    private innerAtendimento: Atendimento;
    private innerService;
    private innerTriagensTodosAtendimentos: Array<Triagem>;
    private equipesTriagensTodosAtendimentos: Array<Equipe>;
    private triagensTodosAtendimentosByEquipe = [[]];
    private equipes: Array<Equipe>;
    private equipesSelecteds: Array<Equipe>;
    
    constructor( router: Router ) {
    }
    
    ngOnInit() { 
        this.equipes = new Array<Equipe>();
        this.equipesSelecteds = new Array<Equipe>();
        this.equipesTriagensTodosAtendimentos = new Array<Equipe>();
    }
    
    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["triagensTodosAtendimentos"] != undefined ) {
            this.innerTriagensTodosAtendimentos = changes["triagensTodosAtendimentos"].currentValue;
            this.getTriagensTodosAtendimentos();
        }
        if ( changes["service"] != undefined ) {
            this.innerService = changes["service"].currentValue;
            this.getEquipes();
        }
        if ( changes["atendimento"] != undefined ) {
            this.innerAtendimento = changes["atendimento"].currentValue;
            if ( this.innerAtendimento.getId() > 0 ) {
                this.equipesSelecteds = this.innerAtendimento.getFilaEsperaOcupacional().getRiscoPotencial().getEquipes();
            }
        }
    }
    
    getEquipes() {
        this.service.getEquipes()
            .then( res => {
                this.equipes = new EquipeBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( "Erro ao retornar os prazos." );
            } )
    }
    
    getTriagensTodosAtendimentos() {
        this.equipesTriagensTodosAtendimentos = new Array<Equipe>();
        this.triagensTodosAtendimentosByEquipe = [[]];
        
        this.triagensTodosAtendimentos.forEach( t => {
            if ( t.getJustificativa() != undefined || t.getJustificativa() != '' ) {
                if ( t.getDiagnostico() == undefined )
                    t.setDiagnostico(new DiagnosticoBuilder().initialize(new Diagnostico()));
                if (t.getIntervencao() == undefined )
                    t.setIntervencao(new IntervencaoBuilder().initialize(new Intervencao()));
                if (t.getEquipeAbordagem() == undefined )
                    t.setEquipeAbordagem(new EquipeBuilder().initialize(new Equipe()));
                if (t.getPrazo() == undefined )
                    t.setPrazo('');
            }
            
            if ( t.getDiagnostico() != undefined && t.getDiagnostico().getId() > 0 || 
                    ( t.getJustificativa() != undefined && t.getJustificativa() != "" ) ) {
                if ( this.equipesTriagensTodosAtendimentos.find( e => e.getId() == t.getIndicadorSast().getEquipe().getId() ) == undefined )
                    this.equipesTriagensTodosAtendimentos.push( t.getIndicadorSast().getEquipe() );
    
                if ( this.triagensTodosAtendimentosByEquipe[t.getIndicadorSast().getEquipe().getId()] == undefined ) {
                    this.triagensTodosAtendimentosByEquipe[t.getIndicadorSast().getEquipe().getId()] = new Array<Triagem>();
                }
    
                this.triagensTodosAtendimentosByEquipe[t.getIndicadorSast().getEquipe().getId()].push( t );
            }
        } )
    }
    
    addEquipe( valor: number ) {
        if ( valor != 0 ) {
            let e = this.equipesSelecteds.find( c => c.getId() == valor );
            if ( e == undefined ) {
                let equipe: Equipe = this.equipes.find( eq => eq.getId() == valor );
                this.equipesSelecteds.push( equipe );
                this.innerAtendimento.getFilaEsperaOcupacional().getRiscoPotencial().setEquipes( this.equipesSelecteds );
            }
        }
    }

    removeEquipe( i: number ) {
        this.innerAtendimento.getFilaEsperaOcupacional().getRiscoPotencial().getEquipes().splice( i, 1 );
    }
    
    verifyIndiceTriagem( triagem: Triagem ) {
        if ( triagem.getIndice() > -1 ) return true;

        return false;
    }
    
    getIndiceDescricao( triagem: Triagem ) {
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];
    }
    
}