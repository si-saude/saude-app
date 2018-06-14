import { Component, OnInit, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';

import { GenericListComponent } from './../../generics/generic.list.component';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { GrupoMonitoramentoFilter } from './grupo-monitoramento.filter';
import { GrupoMonitoramentoGuard } from './../../guards/guards-child/grupo-monitoramento.guard';
import { GrupoMonitoramentoService } from './grupo-monitoramento.service';
import { CheckboxUtil } from './../../generics/utils/checkbox.util'; 

@Component({
  selector: 'app-grupo-monitoramento',
  templateUrl: './grupo-monitoramento.component.html',
  styleUrls: ['./grupo-monitoramento.component.css', '../../../assets/css/list-component.css']
})
export class GrupoMonitoramentoComponent extends GenericListComponent<GrupoMonitoramento, GrupoMonitoramentoFilter, GrupoMonitoramentoGuard> {
    recorrente: CheckboxUtil;
    relatorio: CheckboxUtil;
    auditoriaAso: CheckboxUtil;
    
    constructor(grupoMonitoramentoService: GrupoMonitoramentoService, grupoMonitoramentoGuard: GrupoMonitoramentoGuard, router: Router) {
        super(grupoMonitoramentoService, new GrupoMonitoramentoFilter(), grupoMonitoramentoGuard, router);
    }
    
    ngAfterViewInit() {
        this.recorrente = new CheckboxUtil(document.getElementById("recorrente") as HTMLInputElement);
        this.relatorio = new CheckboxUtil(document.getElementById("relatorio") as HTMLInputElement);
        this.auditoriaAso = new CheckboxUtil(document.getElementById("auditoriaAso") as HTMLInputElement);
    }
    
    filtrar() {
        this.filter.getRecorrente().setValue(this.recorrente.getValue());
        this.filter.getRelatorio().setValue(this.relatorio.getValue());
        this.filter.getAuditoriaAso().setValue(this.auditoriaAso.getValue());
        
        this.setFilter();
    }

}