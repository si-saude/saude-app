import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { GenericService } from './../../generics/generic.service';
import { CnaeFilter } from './cnae.filter';
 
@Injectable()
export class CnaeService extends GenericService {

    constructor( http: Http, router: Router) {
        super(http,router,"cnae");
    }
    
    getCnaes() {
        return this.selectList(new CnaeFilter());
    }
    
}