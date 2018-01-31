import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Criterio } from './../../model/criterio';
import { CriterioService } from './criterio.service';
import { CriterioFilter } from './criterio.filter';
import { CriterioGuard } from './../../guards/guards-child/criterio.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-criterio',
    templateUrl: './criterio.component.html',
    styleUrls: ['./criterio.component.css', '../../../assets/css/list-component.css']
} )
export class CriterioComponent extends GenericListComponent<Criterio, CriterioFilter, CriterioGuard> {
    tipos: Array<string>;

    constructor( service: CriterioService, criterioGuard: CriterioGuard, router: Router ) {
        super( service, new CriterioFilter(), criterioGuard, router );
        
        this.tipos = new Array<string>();
        
        service.getTipos()
            .then(res => {
                this.tipos = Object.keys(res.json());
            })
            .catch(error => {
                console.log(error);
            })
    }

}