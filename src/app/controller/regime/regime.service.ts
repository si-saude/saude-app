import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Regime } from './../../model/regime';
import { RegimeFilter } from './regime.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class RegimeService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"regime");
    }
    
    getRegimes() {
        return this.selectList(new RegimeFilter());
    }
    
}