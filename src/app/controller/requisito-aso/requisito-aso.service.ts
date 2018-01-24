import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RequisitoAso } from './../../model/requisito-aso';
import { RequisitoAsoFilter } from './requisito-aso.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class RequisitoAsoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"requisito-aso");
    }
    
}