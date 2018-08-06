import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Aprho } from './../../model/aprho';
import { AprhoService } from './aprho.service';
import { AprhoFilter } from './aprho.filter';
import { AprhoGuard } from './../../guards/guards-child/aprho.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-aprho',
    templateUrl: './aprho.component.html',
    styleUrls: ['./aprho.component.css', '../../../assets/css/list-component.css']
} )
export class AprhoComponent extends GenericListComponent<Aprho, AprhoFilter, AprhoGuard> {

    constructor( service: AprhoService, aprhoGuard: AprhoGuard, router: Router ) {
        super( service, new AprhoFilter(), aprhoGuard, router );
    }
    
    setFilter() {
        this.formateDateFilter(this.filter.getDataRevisao());
        super.setFilter();
    }
    
    
}