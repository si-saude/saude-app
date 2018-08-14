import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { EmpregadosPorGrupoDto } from './../../model/dto/empregados-por-grupo-dto';
import { GrupoMonitoramentoService } from './../../controller/grupo-monitoramento/grupo-monitoramento.service';
import { GrupoMonitoramentoBuilder } from './../../controller/grupo-monitoramento/grupo-monitoramento.builder';
import { EmpregadosPorGrupoReportService } from './empregados-por-grupo-report.service';
import { EmpregadosPorGrupoReportBuilder } from './empregados-por-grupo-report.builder';
import { GrupoMonitoramentoFilter } from './../../controller/grupo-monitoramento/grupo-monitoramento.filter';
import { GenericReportComponent } from './../../generics/generic.report.component';

@Component( {
    selector: 'app-empregados-por-grupo-list',
    templateUrl: './empregados-por-grupo-report.html',
    styleUrls: ['./empregados-por-grupo-report.css', './../../../assets/css/report-component.css']
} )
export class EmpregadosPorGrupoReportComponent extends GenericReportComponent<EmpregadosPorGrupoDto> {
    private grupoMonitoramento: number;
    private empregadosPorGrupo: Array<EmpregadosPorGrupoDto>;
    private gruposMonitoramento: Array<GrupoMonitoramento>;
    
    constructor(private grupoMonitoramentoService: GrupoMonitoramentoService,
            private empregadosPorGrupoService: EmpregadosPorGrupoReportService) {
        super( empregadosPorGrupoService, new EmpregadosPorGrupoReportBuilder, "empregados-grupo-monitoramento.xlsx");
        
        this.grupoMonitoramento = 0;
        this.gruposMonitoramento = new GrupoMonitoramentoBuilder().initializeList(new Array<GrupoMonitoramento>());
        
        this.getGruposMonitoramento();
    }
    
    getGruposMonitoramento() {
        this.grupoMonitoramentoService.selectList(new GrupoMonitoramentoFilter())
            .then(res => {
                this.gruposMonitoramento = new GrupoMonitoramentoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar grupos monitoramento.");
            })
    }
    
    fetchEmpregadosPorGrupo() {
        if ( this.grupoMonitoramento == 0 ) {
            this.textUtil.showTextToast('Por favor, selecione o grupo de monitoramento', 5000);
        } else {
            this.empregadosPorGrupoService.getEmpregadosPorGrupo( this.grupoMonitoramento )
                .then(res => {
                    this.entities = new EmpregadosPorGrupoReportBuilder().cloneList(res.json());
                    this.value = 'change';
                })
                .catch(error => {
                    console.log("Erro ao buscar empregados por grupo monitoramento.");
                })
            this.arrayObjects.clear();
            this.arrayTypes = new Array<string>();
        }
    }
    
}