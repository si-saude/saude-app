import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Alimento } from '../../model/alimento';
import { AlimentoService } from './../alimento/alimento.service';
import { AlimentoFilter } from './../alimento/alimento.filter';
import { AlimentoGuard } from './../../guards/guards-child/alimento.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-alimento',
    templateUrl: './alimento.component.html',
    styleUrls: ['./alimento.component.css', '../../../assets/css/list-component.css']
} )
export class AlimentoComponent extends GenericListComponent<Alimento, AlimentoFilter, AlimentoGuard> {

    constructor( service: AlimentoService, alimentoGuard: AlimentoGuard, router: Router ) {
        super( service, new AlimentoFilter(), alimentoGuard, router );
    }
    
}