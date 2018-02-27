import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Diagnostico } from './../../model/diagnostico';
import { DiagnosticoFilter } from './diagnostico.filter';
import { EixoService } from './../eixo/eixo.service'; 
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class DiagnosticoService extends GenericService {

    constructor( http: Http, router: Router,
            private eixoService: EixoService) { 
        super(http, router, "diagnostico");
    }
    
    getEixos() {
        return this.eixoService.getEixos();
    }
    
    getDiagnosticos() {
        return this.selectList(new DiagnosticoFilter());
    }
}