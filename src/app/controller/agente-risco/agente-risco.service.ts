import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { AgenteRisco } from './../../model/agente-risco';
import { AgenteRiscoFilter } from './agente-risco.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class AgenteRiscoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"agente-risco");
    }
    
    getAgenteRiscos() {
        return this.selectList(new AgenteRiscoFilter());
    }
    
    getCategoriaAgenteRiscos() {
        let urlCategoriaAgenteRisco = GlobalVariable.BASE_API_URL + "/generic/categoria-agente-risco";
        return this.http
            .get( urlCategoriaAgenteRisco + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
}