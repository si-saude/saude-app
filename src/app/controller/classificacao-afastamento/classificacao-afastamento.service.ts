import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
    
import { ClassificacaoAfastamento } from './../../model/classificacao-afastamento';
import { ClassificacaoAfastamentoFilter } from './classificacao-afastamento.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ClassificacaoAfastamentoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"classificacao-afastamento");
    }
    
    getClassificacaoAfastamentos() {
        return this.selectList(new ClassificacaoAfastamentoFilter());
    }
}