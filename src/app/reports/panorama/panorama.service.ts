import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';

@Injectable()
export class PanoramaService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super( http, router, "panorama" );
    }
    
    getPanoramas() {
        let urlPanoramas = this.URL + "/get-panoramas";
        return this.http
            .get( urlPanoramas, { headers: this.headers } )
            .toPromise();
    }
    
    exportFile( array ) {
        let urlFile = this.URL + "/get-file";
        return this.http
            .post( urlFile, array, { headers: this.headers } )
            .toPromise();
    }
    
}