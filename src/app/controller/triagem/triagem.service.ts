import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Triagem } from './../../model/triagem';
import { TriagemFilter } from './triagem.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class TriagemService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super( http, router, "triagem" );
    }
    
}