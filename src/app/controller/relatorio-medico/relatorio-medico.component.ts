import { Component, ViewChild, ElementRef } from '@angular/core';
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
    finalizado: HTMLInputElement;
    flagFinalizado: number = 0;
    @ViewChild("fin") f: ElementRef;

    constructor(service: RelatorioMedicoService, relatorioMedicoGuard: RelatorioMedicoGuard, router: Router) {
        super(service, new RelatorioMedicoFilter(), relatorioMedicoGuard, router);
    }
    
    ngAfterViewInit() {
        this.finalizado = this.f.nativeElement;
        this.finalizado.indeterminate = true;
        this.finalizado.checked = true;
    }
    
    changeStateFinalizado() {
        if ( this.finalizado.checked == false ) {
            this.flagFinalizado++;
        }
        if ( this.flagFinalizado % 2 == 0 ) {
            this.finalizado.indeterminate = true;
            this.finalizado.checked = true;
            this.flagFinalizado = 0;
        }
    }

    filtrar() {
        if ( this.finalizado.indeterminate == true )
            this.filter.getFinalizado().setValue(0);
        else if ( this.finalizado.checked == true )
            this.filter.getFinalizado().setValue(1);
        else this.filter.getFinalizado().setValue(2);
        
        this.setFilter();
    }
    
}
