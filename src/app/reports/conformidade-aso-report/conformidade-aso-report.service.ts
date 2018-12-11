import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { InterfaceServiceReport } from './../../interfaces/interface.service.report';

@Injectable()
export class ConformidadeAsoReportService extends GenericService implements InterfaceServiceReport {

    constructor( http: Http, router: Router ) { 
        super(http, router, "aso");
    }
    
    getAsosByAno(ano: number) {
        let urlAsosByAno = this.URL + "/get-asos-by-ano";
        return this.http
            .post( urlAsosByAno, ano, { headers: this.headers } )
            .toPromise();
    }
    
    getEntities() {
    }
    
    exportFile( array ) {
        let urlFile = this.URL + "/get-file";
        return this.http
            .post( urlFile, array, { headers: this.headers } )
            .toPromise();
    }
   
}