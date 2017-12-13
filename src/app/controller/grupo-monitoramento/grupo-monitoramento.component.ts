import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { GrupoMonitoramentoFilter } from './grupo-monitoramento.filter';
import { GrupoMonitoramentoGuard } from './../../guards/guards-child/grupo-monitoramento.guard';
import { GrupoMonitoramentoService } from './grupo-monitoramento.service';


@Component({
  selector: 'app-grupo-monitoramento',
  templateUrl: './grupo-monitoramento.component.html',
  styleUrls: ['./grupo-monitoramento.component.css', '../../../assets/css/list-component.css']
})
export class GrupoMonitoramentoComponent extends GenericListComponent<GrupoMonitoramento, GrupoMonitoramentoFilter, GrupoMonitoramentoGuard> {
    recorrente: boolean;
    relatorio: boolean;
    
    constructor(grupoMonitoramentoService: GrupoMonitoramentoService, grupoMonitoramentoGuard: GrupoMonitoramentoGuard) {
        super(grupoMonitoramentoService, new GrupoMonitoramentoFilter(), grupoMonitoramentoGuard);
    }
    
    filtrar() {
        if ( this.recorrente == true )
            this.filter.getRecorrente().setValue(1);
        else this.filter.getRecorrente().setValue(2);
        if ( this.relatorio == true )
            this.filter.getRelatorio().setValue(1);
        else this.filter.getRelatorio().setValue(2);
        
        this.setFilter();
    }

}