import { ViewChild, Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { PreRequisitosAgendamentoDto } from './../../model/dto/pre-requisitos-agendamento-dto';
import { PreRequisitosAgendamentoReportService } from './pre-requisitos-agendamento-report.service';
import { PreRequisitosAgendamentoReportBuilder } from './pre-requisitos-agendamento-report.builder';
import { GenericReportComponent } from './../../generics/generic.report.component';

@Component( {
    selector: 'app-pre-requisitos-agendamento-report',
    templateUrl: './pre-requisitos-agendamento-report.html',
    styleUrls: ['./pre-requisitos-agendamento-report.css', './../../../assets/css/report-component.css']
} )
export class PreRequisitosAgendamentoReportComponent extends GenericReportComponent<PreRequisitosAgendamentoDto> {
    
    constructor(private preRequisitosAgendamentoService: PreRequisitosAgendamentoReportService) {
        super( preRequisitosAgendamentoService, new PreRequisitosAgendamentoReportBuilder, "pre-requisitos-agendamento.xlsx");
    }
    
}