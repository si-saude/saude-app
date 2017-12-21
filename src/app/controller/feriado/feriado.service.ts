import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { FeriadoFilter } from './feriado.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class FeriadoService extends GenericService {
    
    constructor( http: Http, router: Router) { 
        super( http, router, "feriado" );
    }
    
    getFeriados() {
        return this.selectList(new FeriadoFilter());
    }
    
}