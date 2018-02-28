import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RiscoGhe } from './../../model/risco-ghe';
import { RiscoGheFilter } from './risco-ghe.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class RiscoGheService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"risco-ghe");
    }
    
    getRiscos() {
        return this.selectList(new RiscoGheFilter());
    }
    
}