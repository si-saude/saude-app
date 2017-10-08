import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Gerencia } from './../../model/gerencia';
import { GerenciaFilter } from './gerencia.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class GerenciaService extends GenericService {

    constructor( http: Http, router: Router ) {
        super(http, router, "gerencia");
    }

}