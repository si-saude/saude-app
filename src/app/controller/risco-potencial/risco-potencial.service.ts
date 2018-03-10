import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RiscoPotencial } from './../../model/risco-potencial';
import { RiscoPotencialFilter } from './risco-potencial.filter';
import { GenericService } from './../../generics/generic.service';

import { EmpregadoService } from './../empregado/empregado.service';
import { EquipeService } from './../equipe/equipe.service';

@Injectable()
export class RiscoPotencialService extends GenericService {

    constructor( http: Http, router: Router,
            private empregadoService: EmpregadoService,
            private equipeService: EquipeService ) { 
        super(http,router,"risco-potencial");
    }
    
    getRiscos() {
        return this.selectList(new RiscoPotencialFilter());
    }
    
    getEmpregado1() {
        return this.empregadoService.get(15);
    }
    
    getEquipe1() {
        return this.equipeService.get(1);
    }
    
}