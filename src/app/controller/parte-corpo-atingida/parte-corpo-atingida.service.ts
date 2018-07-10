import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { ParteCorpoAtingida } from './../../model/parte-corpo-atingida';
import { ParteCorpoAtingidaFilter } from './parte-corpo-atingida.filter';
import { GenericService } from '../../generics/generic.service';

@Injectable()
export class ParteCorpoAtingidaService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"parte-corpo-atingida");
    }
    
    getParteCorpoAtingidas() {
        return this.selectList(new ParteCorpoAtingidaFilter());
    }
    
}