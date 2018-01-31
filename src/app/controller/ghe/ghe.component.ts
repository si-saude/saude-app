import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ghe } from './../../model/ghe';
import { GheFilter } from './ghe.filter';
import { GheService } from './ghe.service';
import { GheGuard } from './../../guards/guards-child/ghe.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-ghe',
  templateUrl: './ghe.component.html',
  styleUrls: ['./ghe.component.css', '../../../assets/css/list-component.css']
})
export class GheComponent extends GenericListComponent<Ghe, GheFilter, GheGuard> implements OnInit {
    filtro: GheFilter;

    constructor(service: GheService, gheGuard: GheGuard, router: Router) {
        super(service, new GheFilter(), gheGuard, router);
        
        this.filtro = new GheFilter();
    }

    filtrar() {
        if ( this.filtro.getDataCriacao() != undefined ) {
            if ( this.filtro.getDataCriacao().getInicio() != undefined )
                this.filtro.getDataCriacao().setInicio(this.parseDatePickerToDate(this.filtro.getDataCriacao().getInicio()));
            if ( this.filtro.getDataCriacao().getFim() != undefined )
                this.filtro.getDataCriacao().setFim(this.parseDatePickerToDate(this.filtro.getDataCriacao().getFim()));
        }
        
        if ( this.filtro.getDataDesativacao() != undefined ) {
            if ( this.filtro.getDataDesativacao().getInicio() != undefined )
                this.filtro.getDataDesativacao().setInicio(this.parseDatePickerToDate(this.filtro.getDataDesativacao().getInicio()));
            if ( this.filtro.getDataDesativacao().getFim() != undefined )
                this.filtro.getDataDesativacao().setFim(this.parseDatePickerToDate(this.filtro.getDataDesativacao().getFim()));
        }
        
        this.filter = this.filtro;
        this.setFilter();
    }
}
