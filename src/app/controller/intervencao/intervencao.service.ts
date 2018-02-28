import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { IntervencaoFilter } from './intervencao.filter';
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
    
}