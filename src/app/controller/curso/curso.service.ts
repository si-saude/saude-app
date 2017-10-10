import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Curso } from './../../model/curso';
import { CursoFilter } from './curso.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class CursoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http, router, "curso");
    }
}