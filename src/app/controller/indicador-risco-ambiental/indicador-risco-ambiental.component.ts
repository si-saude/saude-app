import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { IndicadorRiscoAmbiental } from './../../model/indicador-risco-ambiental';
import { IndicadorRiscoAmbientalFilter } from './indicador-risco-ambiental.filter';
import { IndicadorRiscoAmbientalService } from './indicador-risco-ambiental.service';


@Component({
  selector: 'app-indicador-risco-ambiental',
  templateUrl: './indicador-risco-ambiental.component.html',
  styleUrls: ['./indicador-risco-ambiental.component.css', '../../../assets/css/list-component.css']
})
export class IndicadorRiscoAmbientalComponent extends GenericListComponent<IndicadorRiscoAmbiental, IndicadorRiscoAmbientalFilter> {

    constructor(indicadorRiscoAmbientalService: IndicadorRiscoAmbientalService) {
        let indicadorRiscoAmbientalFilter: IndicadorRiscoAmbientalFilter = new IndicadorRiscoAmbientalFilter();
        super(indicadorRiscoAmbientalService, indicadorRiscoAmbientalFilter);
    }

}