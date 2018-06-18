import { Router } from '@angular/router';
import { Injectable, Injector, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Gerencia } from './../../model/gerencia';
import { GerenciaFilter } from './gerencia.filter';
import { EmpregadoService } from './../empregado/empregado.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class GerenciaService extends GenericService {
    
    constructor(http: Http, router: Router) {
        super(http, router, "gerencia");
    }

    getGerencias() {
        return this.selectList(new GerenciaFilter());
    }
    
    getGerenciasWithFilterId(id: number) {
        let gerenciaFilter: GerenciaFilter = new GerenciaFilter();
        gerenciaFilter.setId(id);
        return this.selectList(gerenciaFilter);
    }
    
}