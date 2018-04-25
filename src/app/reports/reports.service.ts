import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../generics/generic.service';

@Injectable()
export class ReportsService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super( http, router, "reports" );
    }
    
}