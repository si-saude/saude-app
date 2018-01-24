import { Component } from '@angular/core';

import { Aso } from './../../model/aso';
import { AuditoriaAsoService } from './auditoria-aso.service';
import { AsoFilter } from './../aso/aso.filter';
import { AuditoriaAsoGuard } from './../../guards/guards-child/auditoria-aso.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-auditoria-aso',
    templateUrl: './auditoria-aso.component.html',
    styleUrls: ['./auditoria-aso.component.css', '../../../assets/css/list-component.css']
} )
export class AuditoriaAsoComponent extends GenericListComponent<Aso, AsoFilter, AuditoriaAsoGuard> {

    constructor( service: AuditoriaAsoService, auditoriaAsoGuard: AuditoriaAsoGuard ) {
        super( service, new AsoFilter(), auditoriaAsoGuard );
    }

}