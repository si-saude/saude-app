import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ResultadoExame } from './../../model/resultado-exame';
import { ResultadoExameFilter } from './resultado-exame.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ResultadoExameService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"resultado-exame");
    }
    
}