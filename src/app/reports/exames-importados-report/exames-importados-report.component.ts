import { ViewChild, Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { ExamesImportadosDto } from './../../model/dto/exames-importados-dto';
import { ExamesImportadosReportService } from './exames-importados-report.service';
import { ExamesImportadosReportBuilder } from './exames-importados-report.builder';
import { GenericReportComponent } from './../../generics/generic.report.component';

@Component( {
    selector: 'app-exames-importados-report',
    templateUrl: './exames-importados-report.html',
    styleUrls: ['./exames-importados-report.css', './../../../assets/css/report-component.css']
} )
export class ExamesImportadosReportComponent extends GenericReportComponent<ExamesImportadosDto> {
    
    constructor(private examesImportadosService: ExamesImportadosReportService) {
        super( examesImportadosService, new ExamesImportadosReportBuilder, "exames-importados.xlsx");
    }
    
}