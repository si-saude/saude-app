import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Clinica } from '../../model/clinica';
import { ClinicaService } from '../clinica/clinica.service';
import { ClinicaFilter } from '../clinica/clinica.filter';
import { ClinicaGuard } from '../../guards/guards-child/clinica.guard';
import { GenericListComponent } from '../../generics/generic.list.component';

@Component( {
    selector: 'app-clinica',
    templateUrl: './clinica.component.html',
    styleUrls: ['./clinica.component.css', '../../../assets/css/list-component.css']
} )
export class ClinicaComponent extends GenericListComponent<Clinica, ClinicaFilter, ClinicaGuard> {

    constructor( service: ClinicaService, clinicaGuard: ClinicaGuard, router: Router ) {
        super( service, new ClinicaFilter(), clinicaGuard, router );
    }
    
}