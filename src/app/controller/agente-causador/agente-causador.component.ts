import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AgenteCausador } from './../../model/agente-causador';
import { AgenteCausadorService } from './agente-causador.service';
import { AgenteCausadorFilter } from './agente-causador.filter';
import { AgenteCausadorGuard } from './../../guards/guards-child/agente-causador.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-agente-causador',
    templateUrl: './agente-causador.component.html',
    styleUrls: ['./agente-causador.component.css', '../../../assets/css/list-component.css']
} )
export class AgenteCausadorComponent extends GenericListComponent<AgenteCausador, AgenteCausadorFilter, AgenteCausadorGuard> {

    constructor( service: AgenteCausadorService, agenteCausadorGuard: AgenteCausadorGuard, router: Router ) {
        super( service, new AgenteCausadorFilter(), agenteCausadorGuard, router );
    }
    
    showShortText(texto: string) {
        if ( texto.length > 20 )
            return texto.substr(0, 17)+"...";
        else return texto;
    }
     
}