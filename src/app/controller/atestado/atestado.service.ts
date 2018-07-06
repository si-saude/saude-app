import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { Atestado } from '../../model/atestado';
import { AtestadoFilter } from './atestado.filter';
import { GenericService } from '../../generics/generic.service';
import { EmpregadoService } from './../empregado/empregado.service';
import { CatService } from './../cat/cat.service';

@Injectable()
export class AtestadoService extends GenericService {

    constructor( http: Http, router: Router,
            private empregadoService: EmpregadoService,
            private catService: CatService) { 
        super(http,router,"atestado");
    }
    
    getAtestados() {
        return this.selectList(new AtestadoFilter());
    }
    
    getStatuses() {
        let urlStatuses = GlobalVariable.BASE_API_URL + "/generic/status-atestado";
        return this.http
            .get( urlStatuses + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getAnexo( id: number ) {
        let urlGetAnexo = GlobalVariable.BASE_API_URL + "/atestado/get-anexo";
        return this.http
            .post( urlGetAnexo, id, { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregadoService() {
        return this.empregadoService;
    }
    
    getCatService() {
        return this.catService;
    }
    
}