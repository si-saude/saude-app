import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PossivelDanoSaude } from './../../model/possivel-dano-saude';
import { PossivelDanoSaudeService } from './possivel-dano-saude.service';
import { PossivelDanoSaudeFilter } from './possivel-dano-saude.filter';
import { PossivelDanoSaudeGuard } from './../../guards/guards-child/possivel-dano-saude.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-possivel-dano-saude',
    templateUrl: './possivel-dano-saude.component.html',
    styleUrls: ['./possivel-dano-saude.component.css', '../../../assets/css/list-component.css']
} )
export class PossivelDanoSaudeComponent extends GenericListComponent<PossivelDanoSaude, PossivelDanoSaudeFilter, PossivelDanoSaudeGuard> {

    constructor( service: PossivelDanoSaudeService, possivelDanoSaudeGuard: PossivelDanoSaudeGuard, router: Router ) {
        super( service, new PossivelDanoSaudeFilter(), possivelDanoSaudeGuard, router );
    }
    
}