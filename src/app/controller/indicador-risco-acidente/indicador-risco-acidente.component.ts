import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { IndicadorRiscoAcidente } from './../../model/indicador-risco-acidente';
import { IndicadorRiscoAcidenteFilter } from './indicador-risco-acidente.filter';
import { IndicadorRiscoAcidenteService } from './indicador-risco-acidente.service';


@Component({
  selector: 'app-indicador-risco-acidente',
  templateUrl: './indicador-risco-acidente.component.html',
  styleUrls: ['./indicador-risco-acidente.component.css']
})
export class IndicadorRiscoAcidenteComponent extends GenericListComponent<IndicadorRiscoAcidente, IndicadorRiscoAcidenteFilter> {

    constructor(indicadorRiscoAcidenteService: IndicadorRiscoAcidenteService) {
        let indicadorRiscoAcidenteFilter: IndicadorRiscoAcidenteFilter = new IndicadorRiscoAcidenteFilter();
        super(indicadorRiscoAcidenteService, indicadorRiscoAcidenteFilter);
    }

}