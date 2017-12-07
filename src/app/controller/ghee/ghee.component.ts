import { Component, OnInit } from '@angular/core';

import { Ghee } from './../../model/ghee';
import { GheeFilter } from './ghee.filter';
import { GheeService } from './ghee.service';
import { GheeGuard } from './../../guards/guards-child/ghee.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-ghee',
  templateUrl: './ghee.component.html',
  styleUrls: ['./ghee.component.css', '../../../assets/css/list-component.css']
})
export class GheeComponent extends GenericListComponent<Ghee, GheeFilter, GheeGuard> implements OnInit {
    filtro: GheeFilter;

    constructor(service: GheeService, gheeGuard: GheeGuard) {
        super(service, new GheeFilter(), gheeGuard);
        
        this.filtro = new GheeFilter();
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
