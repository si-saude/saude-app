import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { GrupoMonitoramentoFilter } from './grupo-monitoramento.filter';
import { GrupoMonitoramentoService } from './grupo-monitoramento.service';


@Component({
  selector: 'app-grupo-monitoramento',
  templateUrl: './grupo-monitoramento.component.html',
  styleUrls: ['./grupo-monitoramento.component.css', '../../../assets/css/list-component.css']
})
export class GrupoMonitoramentoComponent extends GenericListComponent<GrupoMonitoramento, GrupoMonitoramentoFilter> {

    constructor(grupoMonitoramentoService: GrupoMonitoramentoService) {
        let grupoMonitoramentoFilter: GrupoMonitoramentoFilter = new GrupoMonitoramentoFilter();
        super(grupoMonitoramentoService, grupoMonitoramentoFilter);
    }

}