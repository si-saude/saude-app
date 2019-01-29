import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Atestado } from '../../model/atestado';
import { AtestadoService } from './atestado.service';
import { AtestadoFilter } from './atestado.filter';
import { BaseFilter } from './../base/base.filter';
import { AtestadoGuard } from '../../guards/guards-child/atestado.guard';
import { GenericListComponent } from '../../generics/generic.list.component';

@Component( {
    selector: 'app-atestado',
    templateUrl: './atestado.component.html',
    styleUrls: ['./atestado.component.css', '../../../assets/css/list-component.css']
} )
export class AtestadoComponent extends GenericListComponent<Atestado, AtestadoFilter, AtestadoGuard> {
    constructor( service: AtestadoService, atestadoGuard: AtestadoGuard, router: Router ) {
        super( service, new AtestadoFilter(), atestadoGuard, router );
    }
    
    ngOnInit() {
        super.ngOnInit();
        this.filter.getEmpregado().setBase(new BaseFilter());
    }
    
}