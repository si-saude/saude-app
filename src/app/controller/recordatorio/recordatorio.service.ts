import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Recordatorio } from './../../model/recordatorio';
import { RecordatorioFilter } from './../recordatorio/recordatorio.filter';
import { NutricaoAlimentoService } from './../nutricao-alimento/nutricao-alimento.service';
import { MedidaAlimentarService } from './../medida-alimentar/medida-alimentar.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class RecordatorioService extends GenericService {

    constructor( http: Http, router: Router,
            private nutricaoAlimentoService: NutricaoAlimentoService,
            private medidaAlimentarService: MedidaAlimentarService) { 
        super(http,router,"recordatorio");
    }
    
    getRecordatorios() {
        return this.selectList(new RecordatorioFilter());
    }
    
    getNutricaoAlimentoService() {
        return this.nutricaoAlimentoService;
    }
    
    getMedidaAlimentarService() {
        return this.medidaAlimentarService;
    }
    
}