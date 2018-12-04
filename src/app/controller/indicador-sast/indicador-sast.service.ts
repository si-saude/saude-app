import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { IndicadorSastFilter } from './indicador-sast.filter';
import { EquipeService } from './../equipe/equipe.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class IndicadorSastService extends GenericService {
    
    constructor( http: Http, router: Router,
            private equipeService: EquipeService) { 
        super( http, router, "indicador-sast" );
    }
    
    getIndicadorSasts() {
        return this.selectList(new IndicadorSastFilter());
    }
    getIndicadoresSasts(indicadorSastFilter: IndicadorSastFilter) {
        return this.selectList(indicadorSastFilter);
    }
    getEquipes() {
        return this.equipeService.getEquipes();
    }
}