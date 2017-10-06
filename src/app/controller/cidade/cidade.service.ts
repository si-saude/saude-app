import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Cidade } from './../../model/cidade';
import { CidadeFilter } from './cidade.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class CidadeService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"cidade");
    }
}