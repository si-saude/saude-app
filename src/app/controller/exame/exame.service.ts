import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ExameFilter } from './exame.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ExameService extends GenericService {
    
    constructor( http: Http, router: Router) { 
        super( http, router, "exame" );
    }
    
    getExames() {
        return this.selectList(new ExameFilter());
    }
    
}