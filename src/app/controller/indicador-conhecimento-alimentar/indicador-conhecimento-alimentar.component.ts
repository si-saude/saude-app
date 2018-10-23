import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IndicadorConhecimentoAlimentar } from './../../model/indicador-conhecimento-alimentar';
import { IndicadorConhecimentoAlimentarService } from './indicador-conhecimento-alimentar.service';
import { IndicadorConhecimentoAlimentarFilter } from './indicador-conhecimento-alimentar.filter';
import { IndicadorConhecimentoAlimentarGuard } from './../../guards/guards-child/indicador-conhecimento-alimentar.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-indicador-conhecimento-alimentar',
    templateUrl: './indicador-conhecimento-alimentar.component.html',
    styleUrls: ['./indicador-conhecimento-alimentar.component.css', '../../../assets/css/list-component.css']
} )
export class IndicadorConhecimentoAlimentarComponent extends GenericListComponent<IndicadorConhecimentoAlimentar, IndicadorConhecimentoAlimentarFilter, IndicadorConhecimentoAlimentarGuard> {

    constructor( service: IndicadorConhecimentoAlimentarService, indicadorConhecimentoAlimentarGuard: IndicadorConhecimentoAlimentarGuard, router: Router ) {
        super( service, new IndicadorConhecimentoAlimentarFilter(), indicadorConhecimentoAlimentarGuard, router );
    }
    
}