import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Enfase } from '../../model/enfase';
import { EnfaseService } from './enfase.service';
import { EnfaseFilter } from './enfase.filter';
import { EnfaseGuard } from './../../guards/guards-child/enfase.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-enfase',
    templateUrl: './enfase.component.html',
    styleUrls: ['./enfase.component.css', '../../../assets/css/list-component.css']
} )
export class EnfaseComponent extends GenericListComponent<Enfase, EnfaseFilter, EnfaseGuard> {

    constructor( service: EnfaseService, enfaseGuard: EnfaseGuard, router: Router ) {
        super( service, new EnfaseFilter(), enfaseGuard, router );
    }
    
}