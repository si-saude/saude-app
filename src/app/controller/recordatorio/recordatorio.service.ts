import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Recordatorio } from './../../model/recordatorio';
import { RecordatorioFilter } from './../recordatorio/recordatorio.filter';
import { AlimentoService } from './../alimento/alimento.service';
import { MedidaAlimentarService } from './../medida-alimentar/medida-alimentar.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class RecordatorioService extends GenericService {

    constructor( http: Http, router: Router,
            private alimentoService: AlimentoService,
            private medidaAlimentarService: MedidaAlimentarService) { 
        super(http,router,"recordatorio");
    }
    
    getRecordatorios() {
        return this.selectList(new RecordatorioFilter());
    }
    
    getAlimentoService() {
        return this.alimentoService;
    }
    
    getMedidaAlimentarService() {
        return this.medidaAlimentarService;
    }
    
    getNe(recordatorio) {
        let urlGetNe = this.URL + "/get-ne";
        return this.http
            .post( urlGetNe, recordatorio, { headers: this.headers } )
            .toPromise();
    }
    
    verifyRecordatorio(filter){
        let urlVerifyRecordatorio = this.URL + "/verify-recordatorio";
        return this.http
            .post( urlVerifyRecordatorio, filter, { headers: this.headers } )
            .toPromise();
        
    }
    
    verifyRecordatorioAlimento(filter){
        let urlVerifyRecordatorio = this.URL + "/verify-recordatorio-alimento";
        return this.http
            .post( urlVerifyRecordatorio, filter, { headers: this.headers } )
            .toPromise();
        
    }
}