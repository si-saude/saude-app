import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { PlanoAlimentar } from './../../model/plano-alimentar';
import { PlanoAlimentarFilter } from './../plano-alimentar/plano-alimentar.filter';
import { AlimentoService } from './../alimento/alimento.service';
import { MedidaAlimentarService } from './../medida-alimentar/medida-alimentar.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class PlanoAlimentarService extends GenericService {

    constructor( http: Http, router: Router,
            private alimentoService: AlimentoService,
            private medidaAlimentarService: MedidaAlimentarService) { 
        super(http,router,"plano-alimentar");
    }
    
    getPlanoAlimentars() {
        return this.selectList(new PlanoAlimentarFilter());
    }
    
    getAlimentoService() {
        return this.alimentoService;
    }
    
    getMedidaAlimentarService() {
        return this.medidaAlimentarService;
    }
    
    getNe(planoAlimentar) {
        let urlGetNe = this.URL + "/get-ne";
        return this.http
            .post( urlGetNe, planoAlimentar, { headers: this.headers } )
            .toPromise();
    }
    
    verifyPlanoAlimentar(filter){
        let urlVerifyPlanoAlimentar = this.URL + "/verify-plano-alimentar";
        return this.http
            .post( urlVerifyPlanoAlimentar, filter, { headers: this.headers } )
            .toPromise();
        
    }
    
    
    getPlanoPDF( planoAlimentar ) {
        let urlPlanoPDF = this.URL + "/plano-pdf";
        return this.http
            .post( urlPlanoPDF, planoAlimentar, { headers: this.headers } )
            .toPromise();
    }
    
}