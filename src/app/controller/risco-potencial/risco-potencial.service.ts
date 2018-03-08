import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RiscoPotencial } from './../../model/risco-potencial';
import { RiscoPotencialFilter } from './risco-potencial.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class RiscoPotencialService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"risco-potencial");
    }
    
    getRiscos() {
        return this.selectList(new RiscoPotencialFilter());
    }
    
}