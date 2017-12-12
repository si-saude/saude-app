import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { EmpregadoConvocacao } from './../../model/empregado-convocacao';
import { EmpregadoConvocacaoFilter } from './empregado-convocacao.filter';

import { GenericService } from './../../generics/generic.service';

@Injectable()
export class EmpregadoConvocacaoService extends GenericService {
    
    constructor( http: Http, router: Router) { 
        super(http, router, "empregado-convocacao");
    }
}