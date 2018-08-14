import { ViewChild, Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { PanoramaDto } from './../../model/dto/panorama-dto';
import { PanoramaReportService } from './panorama-report.service';
import { PanoramaReportBuilder } from './panorama-report.builder';
import { GenericReportComponent } from './../../generics/generic.report.component';

@Component( {
    selector: 'app-panorama-report',
    templateUrl: './panorama-report.html',
    styleUrls: ['./panorama-report.css', './../../../assets/css/report-component.css']
} )
export class PanoramaReportComponent extends GenericReportComponent<PanoramaDto> {

    constructor(private panoramaService: PanoramaReportService) {
        super( panoramaService, new PanoramaReportBuilder, "panorama.xlsx");
    }

}