import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../global';
import { GenericService } from './generic.service';

@Injectable()
export class UtilService extends GenericService {

    constructor( http: Http, router: Router) { 
        super(http,router,"generic");
    }
    
    getGenericPath(path: string) {
        let url = GlobalVariable.BASE_API_URL + "/generic/" + path;
        return this.http
            .get( url + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
}