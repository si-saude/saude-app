import { Component, EventEmitter, OnInit } from '@angular/core';

import { GlobalVariable } from './../../global';
import { Profissiograma } from './../../model/profissiograma';
import { ProfissiogramaService } from './profissiograma.service';
import { ProfissiogramaFilter } from './profissiograma.filter';
import { ProfissiogramaGuard } from './../../guards/guards-child/profissiograma.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-profissiograma',
  templateUrl: './profissiograma.component.html',
  styleUrls: ['./profissiograma.component.css', '../../../assets/css/list-component.css']
})
export class ProfissiogramaComponent extends GenericListComponent<Profissiograma, ProfissiogramaFilter, ProfissiogramaGuard> {
    filtro: ProfissiogramaFilter;
    concluido: boolean;

    constructor(profissiogramaService: ProfissiogramaService, profissiogramaGuard: ProfissiogramaGuard) {
        super(profissiogramaService, new ProfissiogramaFilter(), profissiogramaGuard);   
        
        this.filtro = new ProfissiogramaFilter();
    }
    
    filtrar() {
        if ( this.concluido == true )
            this.filtro.getConcluido().setValue(1);
        else this.filtro.getConcluido().setValue(2);
        
        this.filter = this.filtro;
        this.setFilter();
    }
    
}