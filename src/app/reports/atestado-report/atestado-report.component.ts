import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AtestadoDto } from './../../model/dto/atestado-dto';
import { AtestadoReportService } from './atestado-report.service';
import { AtestadoReportBuilder } from './atestado-report.builder';
import { AtestadoGuard } from './../../guards/guards-child/atestado.guard';
import { GenericReportComponent } from './../../generics/generic.report.component';

@Component( {
    selector: 'app-atestado-report',
    templateUrl: './atestado-report.html',
    styleUrls: ['./atestado-report.css', './../../../assets/css/report-component.css']
} )
export class AtestadoReportComponent extends GenericReportComponent<AtestadoDto> {
    
    constructor(private atestadoService: AtestadoReportService) {
        super( atestadoService, new AtestadoReportBuilder, "atestado.xlsx");
    }
    
}