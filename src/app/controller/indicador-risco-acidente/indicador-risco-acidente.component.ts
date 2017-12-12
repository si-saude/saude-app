import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { IndicadorRiscoAcidente } from './../../model/indicador-risco-acidente';
import { IndicadorRiscoAcidenteFilter } from './indicador-risco-acidente.filter';
import { IndicadorRiscoAcidenteGuard } from './../../guards/guards-child/indicador-risco-acidente.guard';
import { IndicadorRiscoAcidenteService } from './indicador-risco-acidente.service';


@Component({
  selector: 'app-indicador-risco-acidente',
  templateUrl: './indicador-risco-acidente.component.html',
  styleUrls: ['./indicador-risco-acidente.component.css', '../../../assets/css/list-component.css']
})
export class IndicadorRiscoAcidenteComponent extends GenericListComponent<IndicadorRiscoAcidente, IndicadorRiscoAcidenteFilter, IndicadorRiscoAcidenteGuard> {

    constructor(indicadorRiscoAcidenteService: IndicadorRiscoAcidenteService, indicadorRiscoAcidenteGuard: IndicadorRiscoAcidenteGuard) {
        super(indicadorRiscoAcidenteService, new IndicadorRiscoAcidenteFilter(), indicadorRiscoAcidenteGuard);
    }

}