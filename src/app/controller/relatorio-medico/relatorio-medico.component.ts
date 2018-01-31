import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RelatorioMedico } from './../../model/relatorio-medico';
import { RelatorioMedicoService } from './relatorio-medico.service';
import { RelatorioMedicoFilter } from './relatorio-medico.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { RelatorioMedicoGuard } from './../../guards/guards-child/relatorio-medico.guard';

@Component({
  selector: 'app-relatorio-medico',
  templateUrl: './relatorio-medico.component.html',
  styleUrls: ['./relatorio-medico.component.css', '../../../assets/css/list-component.css']
})
export class RelatorioMedicoComponent extends GenericListComponent<RelatorioMedico, RelatorioMedicoFilter, RelatorioMedicoGuard> {
    filtro: RelatorioMedicoFilter;
    finalizado: boolean;

    constructor(service: RelatorioMedicoService, relatorioMedicoGuard: RelatorioMedicoGuard, router: Router) {
        super(service, new RelatorioMedicoFilter(), relatorioMedicoGuard, router);
        
        this.filtro = new RelatorioMedicoFilter();
    }

    filtrar() {
        if ( this.finalizado == true )
            this.filtro.getFinalizado().setValue(1);
        else this.filtro.getFinalizado().setValue(2);
        
        this.filter = this.filtro;
        this.setFilter();
    }
    
}
