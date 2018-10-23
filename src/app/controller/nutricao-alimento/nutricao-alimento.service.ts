import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { NutricaoAlimento } from '../../model/nutricao-alimento';
import { NutricaoAlimentoFilter } from '../nutricao-alimento/nutricao-alimento.filter';
import { GenericService } from '../../generics/generic.service';
import { MedidaAlimentarService } from './../medida-alimentar/medida-alimentar.service';

@Injectable()
export class NutricaoAlimentoService extends GenericService {

    constructor( http: Http, router: Router,
            private medidaAlimentarService: MedidaAlimentarService ) { 
        super(http,router,"nutricao-alimento");
    }
    
    getNutricaoAlimentos() {
        return this.selectList(new NutricaoAlimentoFilter());
    }
    
    getTipos() {
        let urlTipo = GlobalVariable.BASE_API_URL + "/generic/tipo-alimento";
        return this.http
            .get( urlTipo + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getMedidaAlimentarService() {
        return this.medidaAlimentarService;
    }
    
}