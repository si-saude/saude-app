import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { RelatorioMedico } from './../../model/relatorio-medico';
import { RelatorioMedicoService } from './relatorio-medico.service';
import { RelatorioMedicoFilter } from './relatorio-medico.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { RelatorioMedicoGuard } from './../../guards/guards-child/relatorio-medico.guard';
import { CheckboxUtil } from './../../generics/utils/checkbox.util'; 

@Component({
  selector: 'app-relatorio-medico',
  templateUrl: './relatorio-medico.component.html',
  styleUrls: ['./relatorio-medico.component.css', '../../../assets/css/list-component.css']
})
export class RelatorioMedicoComponent extends GenericListComponent<RelatorioMedico, RelatorioMedicoFilter, RelatorioMedicoGuard> {
    finalizado: CheckboxUtil;

    constructor(service: RelatorioMedicoService, relatorioMedicoGuard: RelatorioMedicoGuard, router: Router) {
        super(service, new RelatorioMedicoFilter(), relatorioMedicoGuard, router);
    }
    
    ngAfterViewInit() {
        this.finalizado = new CheckboxUtil(document.getElementById("finalizado") as HTMLInputElement);
    }
    
    filtrar() {
        this.filter.getFinalizado().setValue(this.finalizado.getValue());
        
        this.setFilter();
    }
    
}
