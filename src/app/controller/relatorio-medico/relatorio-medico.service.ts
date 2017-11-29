import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RelatorioMedico } from './../../model/relatorio-medico';
import { RelatorioMedicoFilter } from './relatorio-medico.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class RelatorioMedicoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"relatorio-medico");
    }
    
}