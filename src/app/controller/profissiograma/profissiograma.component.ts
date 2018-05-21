import { Component, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../global';
import { Profissiograma } from './../../model/profissiograma';
import { ProfissiogramaService } from './profissiograma.service';
import { ProfissiogramaFilter } from './profissiograma.filter';
import { ProfissiogramaGuard } from './../../guards/guards-child/profissiograma.guard';
import { GenericListComponent } from './../../generics/generic.list.component';
import { CheckboxUtil } from './../../generics/utils/checkbox.util'; 

@Component({
  selector: 'app-profissiograma',
  templateUrl: './profissiograma.component.html',
  styleUrls: ['./profissiograma.component.css', '../../../assets/css/list-component.css']
})
export class ProfissiogramaComponent extends GenericListComponent<Profissiograma, ProfissiogramaFilter, ProfissiogramaGuard> {
    concluido: CheckboxUtil;
    
    constructor(profissiogramaService: ProfissiogramaService, profissiogramaGuard: ProfissiogramaGuard, router: Router) {
        super(profissiogramaService, new ProfissiogramaFilter(), profissiogramaGuard, router);
    }
    
    ngAfterViewInit() {
        this.concluido = new CheckboxUtil(document.getElementById("concluido") as HTMLInputElement);
    }
    
    filtrar() {
        this.filter.getConcluido().setValue(this.concluido.getValue());
        
        this.setFilter();
    }
    
}