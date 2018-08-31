import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Regime } from './../../model/regime';
import { RegimeFilter } from './regime.filter';
import { GenericService } from './../../generics/generic.service';
import { GlobalVariable } from './../../global';

@Injectable()
export class RegimeService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"regime");
    }
    
    getRegimes() {
        return this.selectList(new RegimeFilter());
    }
    
    verificarPrazoAtestado( atestado ) {
        let urlSolicitacao = GlobalVariable.BASE_API_URL + "/atestado/verificar-prazo-atestado";
        return this.http
            .post( urlSolicitacao, atestado, { headers: this.headers } )
            .toPromise();
    }
    
}