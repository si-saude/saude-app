import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { InterfaceServiceReport } from './../../interfaces/interface.service.report';

@Injectable()
export class ExamesImportadosReportService extends GenericService implements InterfaceServiceReport {

    constructor( http: Http, router: Router ) { 
        super( http, router, "exames-importados" );
    }
    
    getEntities() {
        let urlExamesImportados = this.URL + "/get-exames-importados";
        return this.http
            .get( urlExamesImportados, { headers: this.headers } )
            .toPromise();
    }
    
    exportFile( array ) {
        let urlFile = this.URL + "/get-file";
        return this.http
            .post( urlFile, array, { headers: this.headers } )
            .toPromise();
    }
    
}