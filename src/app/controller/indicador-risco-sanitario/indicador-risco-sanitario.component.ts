import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericListComponent } from './../../generics/generic.list.component';
import { IndicadorRiscoSanitario } from './../../model/indicador-risco-sanitario';
import { IndicadorRiscoSanitarioFilter } from './indicador-risco-sanitario.filter';
import { IndicadorRiscoSanitarioService } from './indicador-risco-sanitario.service';
import { IndicadorRiscoSanitarioGuard } from './../../guards/guards-child/indicador-risco-sanitario.guard';

@Component({
  selector: 'app-indicador-risco-sanitario',
  templateUrl: './indicador-risco-sanitario.component.html',
  styleUrls: ['./indicador-risco-sanitario.component.css', '../../../assets/css/list-component.css']
})
export class IndicadorRiscoSanitarioComponent extends GenericListComponent<IndicadorRiscoSanitario, IndicadorRiscoSanitarioFilter, IndicadorRiscoSanitarioGuard> {

    constructor(indicadorRiscoSanitarioService: IndicadorRiscoSanitarioService, indicadorRiscoSanitarioGuard: IndicadorRiscoSanitarioGuard, router: Router) {
        super(indicadorRiscoSanitarioService, new IndicadorRiscoSanitarioFilter(), indicadorRiscoSanitarioGuard, router);
    }

}