import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FonteGeradora } from './../../model/fonte-geradora';
import { FonteGeradoraService } from './fonte-geradora.service';
import { FonteGeradoraFilter } from './fonte-geradora.filter';
import { FonteGeradoraGuard } from './../../guards/guards-child/fonte-geradora.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-fonte-geradora',
    templateUrl: './fonte-geradora.component.html',
    styleUrls: ['./fonte-geradora.component.css', '../../../assets/css/list-component.css']
} )
export class FonteGeradoraComponent extends GenericListComponent<FonteGeradora, FonteGeradoraFilter, FonteGeradoraGuard> {

    constructor( service: FonteGeradoraService, fonteGeradoraGuard: FonteGeradoraGuard, router: Router ) {
        super( service, new FonteGeradoraFilter(), fonteGeradoraGuard, router );
    }
    
}