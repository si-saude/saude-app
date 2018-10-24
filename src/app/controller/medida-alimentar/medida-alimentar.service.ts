import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { MedidaAlimentar } from '../../model/medida-alimentar';
import { MedidaAlimentarFilter } from '../medida-alimentar/medida-alimentar.filter';
import { GenericService } from '../../generics/generic.service';

@Injectable()
export class MedidaAlimentarService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"medida-alimentar");
    }
    
    getMedidaAlimentars() {
        return this.selectList(new MedidaAlimentarFilter());
    }
    
    getUfs() {
        let urlUf = GlobalVariable.BASE_API_URL + "/generic/uf";
        return this.http
            .get( urlUf + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
}