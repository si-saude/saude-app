import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { IntervencaoFilter } from './intervencao.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { EquipeService } from './../equipe/equipe.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class IntervencaoService extends GenericService {
    
    constructor( http: Http, router: Router,
            private equipeService: EquipeService) { 
        super( http, router, "intervencao" );
    }

    getEquipes() {
        return this.equipeService.getEquipes();
    }
    
    getIntervencoes() {
        return this.selectList(new IntervencaoFilter());
    }
    
    getIntervencoesByEquipe( idEquipe ) {
        let intervencaoFilter: IntervencaoFilter = new IntervencaoFilter();
    
        intervencaoFilter.setPageSize(Math.pow(2, 31)-1);
        intervencaoFilter.setEquipe(new EquipeFilter());
        intervencaoFilter.getEquipe().setId( idEquipe );
        
        return this.selectList(intervencaoFilter);
    }
    
    getIntervencaoByDescricaoAndAbreviacao(descricao: string, abreviacaoEquipe: string) {
        let intervencaoFilter: IntervencaoFilter = new IntervencaoFilter();
        let equipeFilter: EquipeFilter = new EquipeFilter();
        
        equipeFilter.setAbreviacao(abreviacaoEquipe);
    
        intervencaoFilter.setPageSize(Math.pow(2, 31)-1);
        intervencaoFilter.setDescricao(descricao);
        intervencaoFilter.setEquipe(equipeFilter);
        
        return this.selectList(intervencaoFilter);
    }
    
}