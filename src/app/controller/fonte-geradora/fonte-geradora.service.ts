import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { FonteGeradora } from './../../model/fonte-geradora';
import { FonteGeradoraFilter } from './fonte-geradora.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class FonteGeradoraService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"fonte-geradora");
    }
    
    getFonteGeradoras() {
        return this.selectList(new FonteGeradoraFilter());
    }
    
}