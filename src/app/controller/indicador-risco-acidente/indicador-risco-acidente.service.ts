import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { PeriodicidadeService } from './../periodicidade/periodicidade.service';
import { IndicadorRiscoAcidenteFilter } from './indicador-risco-acidente.filter';
import { GlobalVariable } from './../../global';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class IndicadorRiscoAcidenteService extends GenericService {
    
    constructor( http: Http, router: Router,
            private periodicidadeService: PeriodicidadeService) { 
        super( http, router, "indicador-risco-acidente" );
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
    
    getIndicadoresRiscoAcidente() {
        return this.selectList(new IndicadorRiscoAcidenteFilter());
    }

    
}