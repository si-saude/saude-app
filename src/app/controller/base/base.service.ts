import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Base } from './../../model/base';
import { BaseFilter } from './../base/base.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class BaseService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"base");
    }
    
    getBases() {
        return this.selectList(new BaseFilter());
    }
    
    getUfs() {
        let urlUf = GlobalVariable.BASE_API_URL + "/generic/uf";
        return this.http
            .get( urlUf + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
}