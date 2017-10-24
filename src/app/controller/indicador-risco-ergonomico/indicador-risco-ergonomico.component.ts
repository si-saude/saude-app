import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { IndicadorRiscoErgonomico } from './../../model/indicador-risco-ergonomico';
import { IndicadorRiscoErgonomicoFilter } from './indicador-risco-ergonomico.filter';
import { IndicadorRiscoErgonomicoService } from './indicador-risco-ergonomico.service';


@Component({
  selector: 'app-indicador-risco-ergonomico',
  templateUrl: './indicador-risco-ergonomico.component.html',
  styleUrls: ['./indicador-risco-ergonomico.component.css']
})
export class IndicadorRiscoErgonomicoComponent extends GenericListComponent<IndicadorRiscoErgonomico, IndicadorRiscoErgonomicoFilter> {

    constructor(indicadorRiscoErgonomicoService: IndicadorRiscoErgonomicoService) {
        let indicadorRiscoErgonomicoFilter: IndicadorRiscoErgonomicoFilter = new IndicadorRiscoErgonomicoFilter();
        super(indicadorRiscoErgonomicoService, indicadorRiscoErgonomicoFilter);
    }

}