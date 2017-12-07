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
    filtro: GrupoMonitoramentoFilter;
    recorrente: boolean;
    relatorio: boolean;
    
    constructor(grupoMonitoramentoService: GrupoMonitoramentoService, grupoMonitoramentoGuard: GrupoMonitoramentoGuard) {
        super(grupoMonitoramentoService, new GrupoMonitoramentoFilter(), grupoMonitoramentoGuard);
        
        this.filtro = new GrupoMonitoramentoFilter();
    }
    
    filtrar() {
        if ( this.recorrente == true )
            this.filtro.getRecorrente().setValue(1);
        else this.filtro.getRecorrente().setValue(2);
        if ( this.relatorio == true )
            this.filtro.getRelatorio().setValue(1);
        else this.filtro.getRelatorio().setValue(2);
        
        this.filter = this.filtro;
        this.setFilter();
    }

}