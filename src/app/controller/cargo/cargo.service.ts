import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GenericService } from './../../generics/generic.service';
import { CursoFilter } from './../curso/curso.filter';
import { CargoFilter } from './../cargo/cargo.filter';

@Injectable()
export class CargoService extends GenericService{

    constructor( http: Http, router: Router ) { 
        super(http, router, "cargo");
    }

    getCursoById(valor){
        //implementar
    }
    
    getCursos(cursoFilter: CursoFilter){
        //implementar
    }
    
    getCargos() {
        return this.selectList(new CargoFilter())
    }
    
}