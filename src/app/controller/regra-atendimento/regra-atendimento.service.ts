import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RegraAtendimento } from './../../model/regra-atendimento';
import { RegraAtendimentoFilter } from './regra-atendimento.filter';
import { GenericService } from './../../generics/generic.service';
import { EquipeService } from './../equipe/equipe.service';

@Injectable()
export class RegraAtendimentoService extends GenericService {

    constructor( http: Http, router: Router,
                private equipeService: EquipeService ) { 
        super( http, router, "regra-atendimento" );
    }
    
    getEquipes() {
        return this.equipeService.getEquipes();
    }
}