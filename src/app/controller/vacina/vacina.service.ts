import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { VacinaFilter } from './../vacina/vacina.filter';

import { GenericService } from './../../generics/generic.service';

@Injectable()
export class VacinaService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http, router, "vacina");
    }
   
    getVacinas() {
        return this.selectList(new VacinaFilter());
    }
    
}