import { Component } from '@angular/core';

import { TipoGrupoMonitoramento } from './../../model/tipo-grupo-monitoramento';
import { TipoGrupoMonitoramentoService } from './tipo-grupo-monitoramento.service';
import { TipoGrupoMonitoramentoFilter } from './tipo-grupo-monitoramento.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-tipo-grupo-monitoramento',
  templateUrl: './tipo-grupo-monitoramento.component.html',
  styleUrls: ['./tipo-grupo-monitoramento.component.css', '../../../assets/css/list-component.css']
})
export class TipoGrupoMonitoramentoComponent extends GenericListComponent<TipoGrupoMonitoramento, TipoGrupoMonitoramentoFilter> {

  constructor(service: TipoGrupoMonitoramentoService) {
      let tipoGrupoMonitoramentoFilter: TipoGrupoMonitoramentoFilter = new TipoGrupoMonitoramentoFilter();
      super(service, tipoGrupoMonitoramentoFilter);
  }
  
}