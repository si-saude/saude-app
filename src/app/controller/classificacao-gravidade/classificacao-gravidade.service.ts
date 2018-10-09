import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ClassificacaoGravidade } from './../../model/classificacao-gravidade';
import { ClassificacaoGravidadeFilter } from './classificacao-gravidade.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ClassificacaoGravidadeService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"classificacao-gravidade");
    }
    
    getClassificacaoGravidades() {
        return this.selectList(new ClassificacaoGravidadeFilter());
    }
}