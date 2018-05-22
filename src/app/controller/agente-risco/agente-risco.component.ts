import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AgenteRisco } from './../../model/agente-risco';
import { AgenteRiscoService } from './agente-risco.service';
import { AgenteRiscoFilter } from './agente-risco.filter';
import { AgenteRiscoGuard } from './../../guards/guards-child/agente-risco.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-agente-risco',
    templateUrl: './agente-risco.component.html',
    styleUrls: ['./agente-risco.component.css', '../../../assets/css/list-component.css']
} )
export class AgenteRiscoComponent extends GenericListComponent<AgenteRisco, AgenteRiscoFilter, AgenteRiscoGuard> {

    constructor( service: AgenteRiscoService, agenteRiscoGuard: AgenteRiscoGuard, router: Router ) {
        super( service, new AgenteRiscoFilter(), agenteRiscoGuard, router );
    }
    
}