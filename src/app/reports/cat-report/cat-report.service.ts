import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { InterfaceServiceReport } from './../../interfaces/interface.service.report';

@Injectable()
export class CatReportService extends GenericService implements InterfaceServiceReport {

    constructor( http: Http, router: Router ) { 
        super(http, router, "cat");
    }
    
    getCats( ) {
        let urlAtestado = this.URL + "/get-cats";
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
    
    getEntities() {
        let urlPanoramas = this.URL + "/get-cats";
        return this.http
            .get( urlPanoramas, { headers: this.headers } )
            .toPromise();
    }
   
}