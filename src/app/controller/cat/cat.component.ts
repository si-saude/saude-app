import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Cat } from './../../model/cat';
import { CatService } from './cat.service';
import { CatFilter } from './cat.filter';
import { CatGuard } from './../../guards/guards-child/cat.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-cat',
    templateUrl: './cat.component.html',
    styleUrls: ['./cat.component.css', '../../../assets/css/list-component.css']
} )
export class CatComponent extends GenericListComponent<Cat, CatFilter, CatGuard> {

    constructor( service: CatService, catGuard: CatGuard, router: Router ) {
        super( service, new CatFilter(), catGuard, router );
    }
    
}