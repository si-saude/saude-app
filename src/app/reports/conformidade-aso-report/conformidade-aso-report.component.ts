import { ViewChild, Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { ConformidadeAsoDto } from './../../model/dto/conformidade-aso-dto';
import { ConformidadeAsoReportService } from './conformidade-aso-report.service';
import { ConformidadeAsoReportBuilder } from './conformidade-aso-report.builder';
import { GenericReportComponent } from './../../generics/generic.report.component';

@Component( {
    selector: 'app-conformidade-aso-report',
    templateUrl: './conformidade-aso-report.html',
    styleUrls: ['./conformidade-aso-report.css', './../../../assets/css/report-component.css']
} )
export class ConformidadeAsoReportComponent extends GenericReportComponent<ConformidadeAsoDto> {
    private ano: number = 0;
    constructor(private conformidadeAsoService: ConformidadeAsoReportService) {
        super( conformidadeAsoService, new ConformidadeAsoReportBuilder, "conformidade-aso.xlsx");
    }

    getEntities() {
        if ( this.ano.toString().length != 4 ) {
            this.textUtil.showTextToast("Por favor, insira um ano v&aacute;lido", 4000);
        } else if ( this.ano.toString().length == 4 ) {
            this.conformidadeAsoService.getAsosByAno( this.ano )
                .then(res => {
                    this.entities = this.builder.cloneList(res.json());
                    this.filter = "";
                    this.value = "change";
                })
                .catch(error => {
                    console.log("Erro ao buscar entidades."+error);
                })
        }
    }
}