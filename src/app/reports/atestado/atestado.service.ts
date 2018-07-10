import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';

@Injectable()
export class AtestadoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http, router, "atestado");
    }
    
    getAtestados() {
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