import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { EmpregadosPorGrupoDto } from './../../model/dto/empregados-por-grupo-dto';
import { GrupoMonitoramentoService } from './../../controller/grupo-monitoramento/grupo-monitoramento.service';
import { GrupoMonitoramentoBuilder } from './../../controller/grupo-monitoramento/grupo-monitoramento.builder';
import { EmpregadosPorGrupoService } from './empregados-por-grupo.service';
import { EmpregadosPorGrupoBuilder } from './empregados-por-grupo.builder';
import { GrupoMonitoramentoFilter } from './../../controller/grupo-monitoramento/grupo-monitoramento.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { GrupoMonitoramentoGuard } from './../../guards/guards-child/grupo-monitoramento.guard';

@Component( {
    selector: 'app-empregados-por-grupo-list',
    templateUrl: './empregados-por-grupo.html',
    styleUrls: ['./empregados-por-grupo.css']
} )
export class EmpregadosPorGrupoComponent {
    private empregadosPorGrupo: Array<EmpregadosPorGrupoDto>;
    private grupoMonitoramento: number;
    private gruposMonitoramento: Array<GrupoMonitoramento>;
    private globalActions;
    private toastParams;
    constructor(private grupoMonitoramentoService: GrupoMonitoramentoService,
            private empregadosPorGrupoService: EmpregadosPorGrupoService) {
        this.empregadosPorGrupo = new EmpregadosPorGrupoBuilder().initializeList(this.empregadosPorGrupo);
        this.grupoMonitoramento = 0;
        this.gruposMonitoramento = new GrupoMonitoramentoBuilder().initializeList(this.gruposMonitoramento);
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
    }
    
    ngOnInit() {
        this.getGruposMonitoramento();
    }
    
    fetchEmpregadosPorGrupo() {
        if ( this.grupoMonitoramento == 0 ) {
            this.toastParams = ['Por favor, selecione o grupo de monitoramento', 5000];
            this.globalActions.emit( 'toast' );
        } else {
            this.empregadosPorGrupoService.getEmpregadosPorGrupo( this.grupoMonitoramento )
                .then(res => {
                    this.empregadosPorGrupo = new EmpregadosPorGrupoBuilder().cloneList(res.json());
                })
                .catch(error => {
                    console.log("Erro ao buscar empregados por grupo monitoramento.");
                })
        }
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
    
}