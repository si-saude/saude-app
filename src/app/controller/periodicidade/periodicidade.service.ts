import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { PeriodicidadeFilter } from './periodicidade.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class PeriodicidadeService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http, router, "periodicidade");
    }
    
    getPeriodicidades() {
        return this.selectList(new PeriodicidadeFilter());
    }
    
}