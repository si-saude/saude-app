import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { AtividadeFisica } from './../../model/atividade-fisica';
import { AtividadeFisicaFilter } from './../atividade-fisica/atividade-fisica.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class AtividadeFisicaService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"atividade-fisica");
    }
    
    getAtividadeFisicas() {
        return this.selectList(new AtividadeFisicaFilter());
    }
    
    getClassificacao() {
        let urlClassificacao =  GlobalVariable.BASE_API_URL + "/generic/classificacao-atividade";
        return this.http
            .get( urlClassificacao + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
}