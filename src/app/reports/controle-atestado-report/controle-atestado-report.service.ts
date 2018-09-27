import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { InterfaceServiceReport } from './../../interfaces/interface.service.report';

@Injectable()
export class ControleAtestadoReportService extends GenericService implements InterfaceServiceReport {

    constructor( http: Http, router: Router ) { 
        super(http, router, "atestado");
    }
    
    getAtestadosByAno(ano: number) {
        let urlAtestadosByAno = this.URL + "/get-atestados-by-ano";
        return this.http
            .post( urlAtestadosByAno, ano, { headers: this.headers } )
            .toPromise();
    }
    
    getEntities() {
        let urlAtestado = this.URL + "/get-atestados";
        return this.http
            .get( urlAtestado, { headers: this.headers } )
            .toPromise();
    }
    
    exportFile( array ) {
        let urlFile = this.URL + "/get-file";
        return this.http
            .post( urlFile, array, { headers: this.headers } )
            .toPromise();
    }
   
}