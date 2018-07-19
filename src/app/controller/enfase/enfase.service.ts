import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Enfase } from './../../model/enfase';
import { EnfaseFilter } from './../enfase/enfase.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class EnfaseService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"enfase");
    }
    
    getEnfases() {
        return this.selectList(new EnfaseFilter());
    }
    
}