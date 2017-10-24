import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Funcao } from './../../model/funcao';
import { FuncaoFilter } from './funcao.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class FuncaoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"funcao");
    }
    
    getFuncoes() {
        return this.selectList(new FuncaoFilter());
    }
    
}