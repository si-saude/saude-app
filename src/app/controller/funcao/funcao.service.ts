import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Funcao } from './../../model/funcao';
import { FuncaoFilter } from './funcao.filter';
import { GenericService } from './../../generics/generic.service';
import { VacinaService } from './../vacina/vacina.service';

@Injectable()
export class FuncaoService extends GenericService {

    constructor( http: Http, router: Router,
            private vacinaService: VacinaService ) { 
        super(http,router,"funcao");
    }
    
    getFuncoes() {
        return this.selectList(new FuncaoFilter());
    }
    
    getVacinas(){
        return this.vacinaService.getVacinas();
    }

    getVacinaById(valor){
        return this.vacinaService.get(valor);
    }
    
}