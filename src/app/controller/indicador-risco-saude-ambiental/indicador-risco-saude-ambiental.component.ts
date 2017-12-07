import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { IndicadorRiscoSaudeAmbiental } from './../../model/indicador-risco-saude-ambiental';
import { IndicadorRiscoSaudeAmbientalFilter } from './indicador-risco-saude-ambiental.filter';
import { IndicadorRiscoSaudeAmbientalService } from './indicador-risco-saude-ambiental.service';
import { IndicadorRiscoSaudeAmbientalGuard } from './../../guards/guards-child/indicador-risco-saude-ambiental.guard';

@Component({
  selector: 'app-indicador-risco-saude-ambiental',
  templateUrl: './indicador-risco-saude-ambiental.component.html',
  styleUrls: ['./indicador-risco-saude-ambiental.component.css', '../../../assets/css/list-component.css']
})
export class IndicadorRiscoSaudeAmbientalComponent extends GenericListComponent<IndicadorRiscoSaudeAmbiental, IndicadorRiscoSaudeAmbientalFilter, IndicadorRiscoSaudeAmbientalGuard> {

    constructor(indicadorRiscoSaudeAmbientalService: IndicadorRiscoSaudeAmbientalService, indicadorRiscoSaudeAmbientalGuard: IndicadorRiscoSaudeAmbientalGuard) {
        super(indicadorRiscoSaudeAmbientalService, new IndicadorRiscoSaudeAmbientalFilter(), indicadorRiscoSaudeAmbientalGuard);
    }

}