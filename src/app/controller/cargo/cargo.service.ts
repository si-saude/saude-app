import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GenericService } from './../../generics/generic.service';
import { CargoFilter } from './cargo.filter';
import { CursoService } from './../curso/curso.service';
import { VacinaService } from './../vacina/vacina.service';

@Injectable()
export class CargoService extends GenericService{

    constructor( http: Http, router: Router,
            private cursoService: CursoService,
            private vacinaService: VacinaService) { 
        super(http, router, "cargo");
    }

    getCursoById(valor){
        return this.cursoService.get(valor);
    }
    
    getCursos(){
        return this.cursoService.getCursos();
    }
    
    getVacinaById(valor){
        return this.vacinaService.get(valor);
    }
    
    getVacinas(){
        return this.vacinaService.getVacinas();
    }
    
    getCargos() {
        return this.selectList(new CargoFilter())
    }
    
}