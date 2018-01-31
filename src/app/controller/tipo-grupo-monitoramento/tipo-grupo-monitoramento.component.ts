import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TipoGrupoMonitoramento } from './../../model/tipo-grupo-monitoramento';
import { TipoGrupoMonitoramentoService } from './tipo-grupo-monitoramento.service';
import { TipoGrupoMonitoramentoFilter } from './tipo-grupo-monitoramento.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { TipoGrupoMonitoramentoGuard } from './../../guards/guards-child/tipo-grupo-monitoramento.guard';

@Component({
  selector: 'app-tipo-grupo-monitoramento',
  templateUrl: './tipo-grupo-monitoramento.component.html',
  styleUrls: ['./tipo-grupo-monitoramento.component.css', '../../../assets/css/list-component.css']
})
export class TipoGrupoMonitoramentoComponent extends GenericListComponent<TipoGrupoMonitoramento, TipoGrupoMonitoramentoFilter, TipoGrupoMonitoramentoGuard> {

  constructor(service: TipoGrupoMonitoramentoService, tipoGrupoMonitoramentoGuard: TipoGrupoMonitoramentoGuard, router: Router) {
      super(service, new TipoGrupoMonitoramentoFilter(), tipoGrupoMonitoramentoGuard, router);
  }
  
}