import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { InterfaceServiceReport } from './../../interfaces/interface.service.report';

@Injectable()
export class EmpregadosPorGrupoReportService extends GenericService implements InterfaceServiceReport{

    constructor( http: Http, router: Router ) { 
        super(http, router, "empregados-por-grupo");
    }
    
   
    getEntities() { 
        let urlEmpregadosPorGrupo = this.URL + "/get-empregados-por-grupo";
        return this.http
            .get( urlEmpregadosPorGrupo + "?id=" + 0, { headers: this.headers } )
            .toPromise();
    }
    
    exportFile( array ) {
        let urlFile = this.URL + "/get-file";
        return this.http
            .post( urlFile, array, { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregadosPorGrupo( id: number ) {
        let urlEmpregadosPorGrupo = this.URL + "/get-empregados-por-grupo";
        return this.http
            .get( urlEmpregadosPorGrupo + "?id=" + id, { headers: this.headers } )
            .toPromise();
    }
   
}