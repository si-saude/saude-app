import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Eixo } from './../../model/eixo';
import { EixoFilter } from './eixo.filter';
import { EquipeService } from './../equipe/equipe.service';
import { EquipeFilter } from './../equipe/equipe.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class EixoService extends GenericService {

    constructor( http: Http, router: Router,
            private equipeService: EquipeService) { 
        super(http, router, "eixo");
    }
    
    getEquipes() {
        return this.equipeService.getEquipes();
    }
    
    getEixos() {
        return this.selectList(new EixoFilter());
    }
    
    getEixosByEquipe( idEquipe ) {
        let eixoFilter: EixoFilter = new EixoFilter();
        eixoFilter.setPageSize(Math.pow(2, 31)-1);
        eixoFilter.setEquipe( new EquipeFilter() );
        eixoFilter.getEquipe().setId( idEquipe );
        
        return this.selectList( eixoFilter );
    }
}