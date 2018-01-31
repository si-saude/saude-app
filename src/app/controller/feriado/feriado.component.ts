import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericListComponent } from './../../generics/generic.list.component';
import { Feriado } from './../../model/feriado';
import { FeriadoFilter } from './feriado.filter';
import { FeriadoGuard } from './../../guards/guards-child/feriado.guard';
import { FeriadoService } from './feriado.service';


@Component({
  selector: 'app-feriado',
  templateUrl: './feriado.component.html',
  styleUrls: ['./feriado.component.css', '../../../assets/css/list-component.css']
})
export class FeriadoComponent extends GenericListComponent<Feriado, FeriadoFilter, FeriadoGuard> {

    constructor(feriadoService: FeriadoService, feriadoGuard: FeriadoGuard, router: Router) {
        super(feriadoService, new FeriadoFilter(), feriadoGuard, router);
    }
    
    initializeFilterDate() {
        if ( this.filter.getData().getInicio() !== null && 
            this.filter.getData().getInicio() !== undefined ) {
            this.filter.getData().setInicio(
                this.parseDatePickerToDate( this.filter.getData().getInicio() ) );
        }

        if ( this.filter.getData().getFim() !== null &&
            this.filter.getData().getFim() !== undefined ) {
            this.filter.getData().setFim(
                this.parseDatePickerToDate( this.filter.getData().getFim() ) );
        }
    }
    
    setFilter() {
        this.initializeFilterDate();
        super.setFilter();
    }

}