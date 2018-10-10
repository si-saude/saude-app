import { ViewChild, Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { AcompanhamentoSastDto } from './../../model/dto/acompanhamento-sast-dto';
import { AcompanhamentoSastReportService } from './acompanhamento-sast-report.service';
import { AcompanhamentoSastReportBuilder } from './acompanhamento-sast-report.builder';
import { GenericReportComponent } from './../../generics/generic.report.component';

@Component( {
    selector: 'app-acompanhamento-sast-report',
    templateUrl: './acompanhamento-sast-report.html',
    styleUrls: ['./acompanhamento-sast-report.css', './../../../assets/css/report-component.css']
} )
export class AcompanhamentoSastReportComponent extends GenericReportComponent<AcompanhamentoSastDto> {

    constructor(private acompanhamentoSastService: AcompanhamentoSastReportService) {
        super( acompanhamentoSastService, new AcompanhamentoSastReportBuilder, "acompanhamento-sast.xlsx");
    }
    
    toggleAcompanhamento( item: AcompanhamentoSastDto ) {
        
    }

}