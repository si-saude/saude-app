import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GenericService } from './../../generics/generic.service';
import { CursoFilter } from './../curso/curso.filter';

@Injectable()
export class FuncaoService extends GenericService{

    constructor( http: Http, router: Router ) { 
        super(http, router, "funcao");
    }

    getCursoById(valor){
        //implementar
    }
    
    getCursos(cursoFilter: CursoFilter){
        //implementar
    }
    
    
}