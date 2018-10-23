import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NutricaoAlimento } from '../../model/nutricao-alimento';
import { NutricaoAlimentoService } from './../nutricao-alimento/nutricao-alimento.service';
import { NutricaoAlimentoFilter } from './../nutricao-alimento/nutricao-alimento.filter';
import { NutricaoAlimentoGuard } from './../../guards/guards-child/nutricao-alimento.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-nutricao-alimento',
    templateUrl: './nutricao-alimento.component.html',
    styleUrls: ['./nutricao-alimento.component.css', '../../../assets/css/list-component.css']
} )
export class NutricaoAlimentoComponent extends GenericListComponent<NutricaoAlimento, NutricaoAlimentoFilter, NutricaoAlimentoGuard> {

    constructor( service: NutricaoAlimentoService, nutricaoAlimentoGuard: NutricaoAlimentoGuard, router: Router ) {
        super( service, new NutricaoAlimentoFilter(), nutricaoAlimentoGuard, router );
    }
    
}