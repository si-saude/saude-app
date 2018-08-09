import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { GlobalVariable } from './../../global';


@Injectable()
export class FilaAtendimentoOcupacionalService extends GenericService {

    constructor( http: Http, router: Router) { 
        super(http,router,"fila-atendimento-ocupacional");
    }  
     
} 