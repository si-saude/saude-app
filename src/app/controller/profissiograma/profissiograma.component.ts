import { Component, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';

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
    flagConcluido: number = 0;
    concluido: HTMLInputElement;
    @ViewChild("conc") c: ElementRef;

    constructor(profissiogramaService: ProfissiogramaService, profissiogramaGuard: ProfissiogramaGuard) {
        super(profissiogramaService, new ProfissiogramaFilter(), profissiogramaGuard);
    }
    
    ngAfterViewInit() {
        this.concluido = this.c.nativeElement;
        this.concluido.indeterminate = true;
    }
    
    changeStateConcluido() {
        if ( this.concluido.checked == false ) {
            this.flagConcluido++;
        }
        if ( this.flagConcluido % 2 == 0 ) {
            this.concluido.indeterminate = true;
            this.concluido.checked = true;
            this.flagConcluido = 0;
        }
    }
    
    filtrar() {
        if ( this.concluido.indeterminate == true )
            this.filter.getConcluido().setValue(0);
        else if ( this.concluido.checked == true )
            this.filter.getConcluido().setValue(1);
        else this.filter.getConcluido().setValue(2);
        
        this.setFilter();
    }
    
}