import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { Alimento } from '../../model/alimento';
import { AlimentoFilter } from '../alimento/alimento.filter';
import { GenericService } from '../../generics/generic.service';
import { MedidaAlimentarService } from './../medida-alimentar/medida-alimentar.service';

@Injectable()
export class AlimentoService extends GenericService {

    constructor( http: Http, router: Router,
            private medidaAlimentarService: MedidaAlimentarService ) { 
        super(http,router,"alimento");
    }
    
    getAlimentos() {
        return this.selectList(new AlimentoFilter());
    }
    
    getListAll(filter) {
        let urlListAll = this.URL + "/get-list-all";
        return this.http
            .post( urlListAll, filter, { headers: this.headers } )
            .toPromise();
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