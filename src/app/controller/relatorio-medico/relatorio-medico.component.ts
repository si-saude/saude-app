import { Component } from '@angular/core';

import { RelatorioMedico } from './../../model/relatorio-medico';
import { RelatorioMedicoService } from './relatorio-medico.service';
import { RelatorioMedicoFilter } from './relatorio-medico.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-relatorio-medico',
  templateUrl: './relatorio-medico.component.html',
  styleUrls: ['./relatorio-medico.component.css', '../../../assets/css/list-component.css']
})
export class RelatorioMedicoComponent extends GenericListComponent<RelatorioMedico, RelatorioMedicoFilter> {

    constructor(service: RelatorioMedicoService) {
        let relatorioMedicoFilter: RelatorioMedicoFilter = new RelatorioMedicoFilter();
        super(service, relatorioMedicoFilter);
    }

}
