import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { IndicadorRiscoErgonomico } from './../../model/indicador-risco-ergonomico';
import { IndicadorRiscoErgonomicoFilter } from './indicador-risco-ergonomico.filter';
import { IndicadorRiscoErgonomicoService } from './indicador-risco-ergonomico.service';
import { IndicadorRiscoErgonomicoGuard } from './../../guards/guards-child/indicador-risco-ergonomico.guard';


@Component({
  selector: 'app-indicador-risco-ergonomico',
  templateUrl: './indicador-risco-ergonomico.component.html',
  styleUrls: ['./indicador-risco-ergonomico.component.css', '../../../assets/css/list-component.css']
})
export class IndicadorRiscoErgonomicoComponent extends GenericListComponent<IndicadorRiscoErgonomico, IndicadorRiscoErgonomicoFilter, IndicadorRiscoErgonomicoGuard> {

    constructor(indicadorRiscoErgonomicoService: IndicadorRiscoErgonomicoService, indicadorRiscoErgonomicoGuard: IndicadorRiscoErgonomicoGuard) {
        super(indicadorRiscoErgonomicoService, new IndicadorRiscoErgonomicoFilter(), indicadorRiscoErgonomicoGuard);
    }

}