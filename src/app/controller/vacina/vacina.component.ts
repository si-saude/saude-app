import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Vacina } from './../../model/vacina';
import { VacinaService } from './vacina.service';
import { VacinaFilter } from './vacina.filter';
import { VacinaGuard } from './../../guards/guards-child/vacina.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-vacina',
    templateUrl: './vacina.component.html',
    styleUrls: ['./vacina.component.css', '../../../assets/css/list-component.css']
} )
export class VacinaComponent extends GenericListComponent<Vacina, VacinaFilter, VacinaGuard> {
    filtro: VacinaFilter;

    constructor( service: VacinaService, vacinaGuard: VacinaGuard, router: Router ) {
        super( service, new VacinaFilter(), vacinaGuard, router );
        
        this.filtro = new VacinaFilter();
    }
    
    filtrar() {
        if ( this.filtro.getDoses() == null ) 
            this.filtro.setDoses(undefined);
        if ( this.filtro.getReforco() == null ) 
            this.filtro.setReforco(undefined);
        this.filter = this.filtro;
        
        this.setFilter();
    }

}