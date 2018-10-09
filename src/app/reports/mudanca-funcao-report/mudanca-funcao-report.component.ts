import { ViewChild, Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { MudancaFuncaoDto } from './../../model/dto/mudanca-funcao-dto';
import { MudancaFuncaoReportService } from './mudanca-funcao-report.service';
import { MudancaFuncaoReportBuilder } from './mudanca-funcao-report.builder';
import { GenericReportComponent } from './../../generics/generic.report.component';

@Component( {
    selector: 'app-mudanca-funcao-report',
    templateUrl: './mudanca-funcao-report.html',
    styleUrls: ['./mudanca-funcao-report.css', './../../../assets/css/report-component.css']
} )
export class MudancaFuncaoReportComponent extends GenericReportComponent<MudancaFuncaoDto> {

    constructor(private mudancaFuncaoService: MudancaFuncaoReportService) {
        super( mudancaFuncaoService, new MudancaFuncaoReportBuilder, "mudanca-funcao.xlsx");
    }

}