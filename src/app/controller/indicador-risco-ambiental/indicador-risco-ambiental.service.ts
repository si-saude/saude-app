import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { PeriodicidadeService } from './../periodicidade/periodicidade.service';
import { IndicadorRiscoAmbientalFilter } from './indicador-risco-ambiental.filter';
import { GlobalVariable } from './../../global';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class IndicadorRiscoAmbientalService extends GenericService {
    
    constructor( http: Http, router: Router,
            private periodicidadeService: PeriodicidadeService) { 
        super( http, router, "indicador-risco-ambiental" );
    }
    
    getRequisitos() {
        let urlRequisitos = GlobalVariable.BASE_API_URL + "/generic/requisito";
        return this.http
            .get( urlRequisitos + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getPeriodicidades() {
        return this.periodicidadeService.getPeriodicidades();
    }
    
    getIndicadoresRiscoAmbiental() {
        return this.selectList(new IndicadorRiscoAmbientalFilter());
    }

    
}