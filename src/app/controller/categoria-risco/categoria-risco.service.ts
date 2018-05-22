import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { CategoriaRisco } from './../../model/categoria-risco';
import { CategoriaRiscoFilter } from './categoria-risco.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class CategoriaRiscoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"categoria-risco");
    }
    
    getCategoriaRiscos() {
        return this.selectList(new CategoriaRiscoFilter());
    }    
}