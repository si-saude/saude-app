import { ViewChild, Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { CatDto } from './../../model/dto/cat-dto';
import { CatReportService } from './cat-report.service';
import { CatReportBuilder } from './cat-report.builder';
import { GenericReportComponent } from './../../generics/generic.report.component';

@Component( {
    selector: 'app-cat-report',
    templateUrl: './cat-report.html',
    styleUrls: ['./cat-report.css', './../../../assets/css/report-component.css']
} )
export class CatReportComponent extends GenericReportComponent<CatDto> {

    constructor(private catService: CatReportService) {
        super( catService, new CatReportBuilder, "cat.xlsx");
    }

}