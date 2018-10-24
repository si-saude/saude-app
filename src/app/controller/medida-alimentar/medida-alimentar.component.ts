import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MedidaAlimentar } from '../../model/medida-alimentar';
import { MedidaAlimentarService } from '../medida-alimentar/medida-alimentar.service';
import { MedidaAlimentarFilter } from '../medida-alimentar/medida-alimentar.filter';
import { MedidaAlimentarGuard } from '../../guards/guards-child/medida-alimentar.guard';
import { GenericListComponent } from '../../generics/generic.list.component';

@Component( {
    selector: 'app-medida-alimentar',
    templateUrl: './medida-alimentar.component.html',
    styleUrls: ['./medida-alimentar.component.css', '../../../assets/css/list-component.css']
} )
export class MedidaAlimentarComponent extends GenericListComponent<MedidaAlimentar, MedidaAlimentarFilter, MedidaAlimentarGuard> {

    constructor( service: MedidaAlimentarService, medidaAlimentarGuard: MedidaAlimentarGuard, router: Router ) {
        super( service, new MedidaAlimentarFilter(), medidaAlimentarGuard, router );
    }
    
}