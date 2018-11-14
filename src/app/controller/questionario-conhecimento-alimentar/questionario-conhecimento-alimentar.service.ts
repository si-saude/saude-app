import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { QuestionarioConhecimentoAlimentarFilter } from './questionario-conhecimento-alimentar.filter';
import { QuestionarioConhecimentoAlimentar } from './../../model/questionario-conhecimento-alimentar';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class QuestionarioConhecimentoAlimentarService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"questionario-conhecimento-alimentar");
    }
    
    getQuestionarioConhecimentoAlimentares() {
        return this.selectList(new QuestionarioConhecimentoAlimentarFilter());
    }
    
    constructQuestionario( id ) {
        let urlConstructQuestionario = this.URL + "/construct-questionario";
        return this.http
            .get( urlConstructQuestionario + "?id=" + id, { headers: this.headers } )
            .toPromise();
    }
 
}