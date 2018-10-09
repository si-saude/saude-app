import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { InterfaceServiceReport } from './../../interfaces/interface.service.report';

@Injectable()
export class MudancaFuncaoReportService extends GenericService implements InterfaceServiceReport {

    constructor( http: Http, router: Router ) { 
        super(http, router, "mudanca-funcao");
    }
    
    exportFile( array ) {
        let urlFile = this.URL + "/get-file";
        return this.http
            .post( urlFile, array, { headers: this.headers } )
            .toPromise();
    }
    
    getEntities() {
        let urlMudancaFuncoes = this.URL + "/get-mudanca-funcoes";
        return this.http
            .get( urlMudancaFuncoes, { headers: this.headers } )
            .toPromise();
    }
   
}