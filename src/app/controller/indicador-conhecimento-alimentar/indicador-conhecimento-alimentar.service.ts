import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { IndicadorConhecimentoAlimentar } from './../../model/indicador-conhecimento-alimentar';
import { IndicadorConhecimentoAlimentarFilter } from './../indicador-conhecimento-alimentar/indicador-conhecimento-alimentar.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class IndicadorConhecimentoAlimentarService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"indicador-conhecimento-alimentar");
    }
    
    getIndicadorConhecimentoAlimentars() {
        return this.selectList(new IndicadorConhecimentoAlimentarFilter());
    }
    
    getUfs() {
        let urlUf = GlobalVariable.BASE_API_URL + "/generic/uf";
        return this.http
            .get( urlUf + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
}