import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Empresa } from '../../model/empresa';
import { EmpresaService } from '../empresa/empresa.service';
import { EmpresaFilter } from '../empresa/empresa.filter';
import { EmpresaGuard } from '../../guards/guards-child/empresa.guard';
import { GenericListComponent } from '../../generics/generic.list.component';

@Component( {
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.css', '../../../assets/css/list-component.css']
} )
export class EmpresaComponent extends GenericListComponent<Empresa, EmpresaFilter, EmpresaGuard> {

    constructor( service: EmpresaService, empresaGuard: EmpresaGuard, router: Router ) {
        super( service, new EmpresaFilter(), empresaGuard, router );
    }
    
}