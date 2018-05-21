import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Servico } from './../../model/servico';
import { ServicoService } from './servico.service';
import { ServicoFilter } from './servico.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { ServicoGuard } from './../../guards/guards-child/servico.guard';
import { CheckboxUtil } from './../../generics/utils/checkbox.util'; 

@Component( {
    selector: 'app-servico',
    templateUrl: './servico.component.html',
    styleUrls: ['./servico.component.css', '../../../assets/css/list-component.css']
} )
export class ServicoComponent extends GenericListComponent<Servico, ServicoFilter, ServicoGuard> {
    publico: CheckboxUtil;

    constructor( service: ServicoService, servicoGuard: ServicoGuard, router: Router ) {
        super( service, new ServicoFilter(), servicoGuard, router );
    }
    
    ngAfterViewInit() {
        this.publico = new CheckboxUtil(document.getElementById("publico") as HTMLInputElement);
    }
    
    filtrar() {
        this.filter.getPublico().setValue(this.publico.getValue());
        
        this.setFilter();
    }

}