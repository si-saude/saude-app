import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { IndicadorRiscoSanitario } from './../../model/indicador-risco-sanitario';
import { IndicadorRiscoSanitarioFilter } from './indicador-risco-sanitario.filter';
import { IndicadorRiscoSanitarioService } from './indicador-risco-sanitario.service';


@Component({
  selector: 'app-indicador-risco-sanitario',
  templateUrl: './indicador-risco-sanitario.component.html',
  styleUrls: ['./indicador-risco-sanitario.component.css', '../../../assets/css/list-component.css']
})
export class IndicadorRiscoSanitarioComponent extends GenericListComponent<IndicadorRiscoSanitario, IndicadorRiscoSanitarioFilter> {

    constructor(indicadorRiscoSanitarioService: IndicadorRiscoSanitarioService) {
        let indicadorRiscoSanitarioFilter: IndicadorRiscoSanitarioFilter = new IndicadorRiscoSanitarioFilter();
        super(indicadorRiscoSanitarioService, indicadorRiscoSanitarioFilter);
    }

}