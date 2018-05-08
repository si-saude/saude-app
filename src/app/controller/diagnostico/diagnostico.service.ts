import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Diagnostico } from './../../model/diagnostico';
import { DiagnosticoFilter } from './diagnostico.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { EixoFilter } from './../eixo/eixo.filter';
import { EixoService } from './../eixo/eixo.service'; 
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class DiagnosticoService extends GenericService {

    constructor( http: Http, router: Router,
            private eixoService: EixoService) { 
        super(http, router, "diagnostico");
    }
    
    getEixos() {
        return this.eixoService.getEixos();
    }
    
    getDiagnosticos() {
        return this.selectList(new DiagnosticoFilter());
    }
    
    getDiagnosticoByDescricaoAndAbreviacao(descricao: string, abreviacaoEquipe: string) {
        let diagnosticoFilter: DiagnosticoFilter = new DiagnosticoFilter();
        let equipeFilter: EquipeFilter = new EquipeFilter();
        let eixoFilter: EixoFilter = new EixoFilter();
        
        equipeFilter.setAbreviacao(abreviacaoEquipe);
        eixoFilter.setEquipe(equipeFilter);
        
        diagnosticoFilter.setPageSize(30);
        diagnosticoFilter.setDescricao(descricao);
        diagnosticoFilter.setEixo(eixoFilter);
        
        return this.selectList(diagnosticoFilter);
    }
    
    getDiagnosticoByCodigoAndAbreviacao(codigo: string, abreviacaoEquipe: string) {
        let diagnosticoFilter: DiagnosticoFilter = new DiagnosticoFilter();
        let equipeFilter: EquipeFilter = new EquipeFilter();
        let eixoFilter: EixoFilter = new EixoFilter();
        
        equipeFilter.setAbreviacao(abreviacaoEquipe);
        eixoFilter.setEquipe(equipeFilter);
        
        diagnosticoFilter.setEixo(eixoFilter);
        diagnosticoFilter.setPageSize(30);
        diagnosticoFilter.setCodigo(codigo);
        
        return this.selectList(diagnosticoFilter);
    }
    
    getDiagnosticoByEixo(idEixo: number, idEquipe: number) {
        let diagnosticoFilter: DiagnosticoFilter = new DiagnosticoFilter();
        
        diagnosticoFilter.setEixo(new EixoFilter());
        diagnosticoFilter.getEixo().setId(idEixo);
        diagnosticoFilter.getEixo().setEquipe(new EquipeFilter());
        diagnosticoFilter.getEixo().getEquipe().setId(idEquipe);
        
        diagnosticoFilter.setPageSize(Math.pow(2, 31)-1);
        
        return this.selectList(diagnosticoFilter);
    }
}