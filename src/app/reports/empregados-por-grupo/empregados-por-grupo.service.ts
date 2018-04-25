import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';

@Injectable()
export class EmpregadosPorGrupoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http, router, "empregados-por-grupo");
    }
    
    getEmpregadosPorGrupo( id: number ) {
        let urlEmpregadosPorGrupo = this.URL + "/get-empregados-por-grupo";
        return this.http
            .get( urlEmpregadosPorGrupo + "?id=" + id, { headers: this.headers } )
            .toPromise();
    }
   
}