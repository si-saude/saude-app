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
    private ano: number = 0;
    constructor(private atestadoService: ControleAtestadoReportService) {
        super( atestadoService, new ControleAtestadoReportBuilder, "atestado.xlsx");
    }
    
    getEntities() {
        if ( this.ano.toString().length != 4 ) {
            this.textUtil.showTextToast("Por favor, insira um ano v&aacute;lido", 4000);
        } else if ( this.ano.toString().length == 4 ) {
            this.atestadoService.getAtestadosByAno( this.ano )
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