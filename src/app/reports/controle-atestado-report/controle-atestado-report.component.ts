import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ControleAtestadoDto } from './../../model/dto/controle-atestado-dto';
import { ControleAtestadoReportService } from './controle-atestado-report.service';
import { ControleAtestadoReportBuilder } from './controle-atestado-report.builder';
import { GenericReportComponent } from './../../generics/generic.report.component';

@Component( {
    selector: 'app-controle-atestado-report',
    templateUrl: './controle-atestado-report.html',
    styleUrls: ['./controle-atestado-report.css', './../../../assets/css/report-component.css']
} )
export class ControleAtestadoReportComponent extends GenericReportComponent<ControleAtestadoDto> {
    
    constructor(private atestadoService: ControleAtestadoReportService) {
        super( atestadoService, new ControleAtestadoReportBuilder, "atestado.xlsx");
    }
}