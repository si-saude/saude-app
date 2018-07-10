import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { AgenteCausador } from './../../model/agente-causador';
import { AgenteCausadorFilter } from './agente-causador.filter';
import { GenericService } from '../../generics/generic.service';

@Injectable()
export class AgenteCausadorService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"agente-causador");
    }
    
    getAgenteCausadors() {
        return this.selectList(new AgenteCausadorFilter());
    }
    
}