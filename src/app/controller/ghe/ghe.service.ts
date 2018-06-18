import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Ghe } from './../../model/ghe';
import { GheFilter } from './ghe.filter';
import { RiscoGheService } from './../risco-ghe/risco-ghe.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class GheService extends GenericService {

    constructor( http: Http, router: Router, private riscoGheService: RiscoGheService ) { 
        super( http, router, "ghe" );
    }
    
    getGhes() {
        return this.selectList(new GheFilter());
    }
    
    getGhesAtivos(filter) {
        
        let urlGheAtivos = this.URL + "/list-ativo";
//        genericFilter.setPageSize(Math.pow(2, 31)-1);
        return this.http
            .post( urlGheAtivos, filter, { headers: this.headers } )
            .toPromise();
    }
    
    getRiscoGhes() {
        return this.riscoGheService.getRiscos();
    }
}