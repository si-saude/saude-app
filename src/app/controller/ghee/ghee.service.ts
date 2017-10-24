import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Ghee } from './../../model/ghee';
import { GheeFilter } from './ghee.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class GheeService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super( http, router, "ghee" );
    }
    
    getGhees() {
        return this.selectList(new GheeFilter());
    }
}