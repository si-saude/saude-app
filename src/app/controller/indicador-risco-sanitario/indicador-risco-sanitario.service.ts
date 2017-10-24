import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { PeriodicidadeService } from './../periodicidade/periodicidade.service';
import { IndicadorRiscoSanitarioFilter } from './indicador-risco-sanitario.filter';
import { GlobalVariable } from './../../global';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class IndicadorRiscoSanitarioService extends GenericService {
    
    constructor( http: Http, router: Router,
            private periodicidadeService: PeriodicidadeService) { 
        super( http, router, "indicador-risco-sanitario" );
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
    

    getIndicadoresRiscoSanitario() {
        return this.selectList(new IndicadorRiscoSanitarioFilter());
    }

    
}