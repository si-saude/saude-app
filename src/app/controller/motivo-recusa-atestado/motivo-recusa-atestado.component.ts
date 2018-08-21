import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MotivoRecusaAtestado } from '../../model/motivo-recusa-atestado';
import { MotivoRecusaAtestadoService } from './motivo-recusa-atestado.service';
import { MotivoRecusaAtestadoFilter } from './motivo-recusa-atestado.filter';
import { MotivoRecusaAtestadoGuard } from '../../guards/guards-child/motivo-recusa-atestado.guard';
import { GenericListComponent } from '../../generics/generic.list.component';

@Component( {
    selector: 'app-motivo-recusa-atestado',
    templateUrl: './motivo-recusa-atestado.component.html',
    styleUrls: ['./motivo-recusa-atestado.component.css', '../../../assets/css/list-component.css']
} )
export class MotivoRecusaAtestadoComponent extends GenericListComponent<MotivoRecusaAtestado, MotivoRecusaAtestadoFilter, MotivoRecusaAtestadoGuard> {

    constructor( service: MotivoRecusaAtestadoService, motivoRecusaAtestadoGuard: MotivoRecusaAtestadoGuard, router: Router ) {
        super( service, new MotivoRecusaAtestadoFilter(), motivoRecusaAtestadoGuard, router );
    }
    
}