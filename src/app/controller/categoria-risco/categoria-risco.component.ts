import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriaRisco } from './../../model/categoria-risco';
import { CategoriaRiscoService } from './categoria-risco.service';
import { CategoriaRiscoFilter } from './categoria-risco.filter';
import { CategoriaRiscoGuard } from './../../guards/guards-child/categoria-risco.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-categoria-risco',
    templateUrl: './categoria-risco.component.html',
    styleUrls: ['./categoria-risco.component.css', '../../../assets/css/list-component.css']
} )
export class CategoriaRiscoComponent extends GenericListComponent<CategoriaRisco, CategoriaRiscoFilter, CategoriaRiscoGuard> {

    constructor( service: CategoriaRiscoService, categoriaRiscoGuard: CategoriaRiscoGuard, router: Router ) {
        super( service, new CategoriaRiscoFilter(), categoriaRiscoGuard, router );
    }
    
}