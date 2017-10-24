import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Criterio } from './../../model/criterio';
import { CriterioFilter } from './criterio.filter';
import { GenericService } from './../../generics/generic.service';
import { GlobalVariable } from './../../global';

@Injectable()
export class CriterioService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"criterio");
    }
    
    getTipos() {
        let urlTipos = GlobalVariable.BASE_API_URL + "/generic/tipo-criterio";
        return this.http
            .get( urlTipos + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getCriterios() {
        return this.selectList(new CriterioFilter());
    }
    
}