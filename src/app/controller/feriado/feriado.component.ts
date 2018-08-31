import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeAction } from "angular2-materialize";

import { GenericListComponent } from './../../generics/generic.list.component';
import { Feriado } from './../../model/feriado';
import { FeriadoFilter } from './feriado.filter';
import { FeriadoGuard } from './../../guards/guards-child/feriado.guard';
import { FeriadoService } from './feriado.service';
import { GlobalVariable } from './../../global';


@Component({
  selector: 'app-feriado',
  templateUrl: './feriado.component.html',
  styleUrls: ['./feriado.component.css', '../../../assets/css/list-component.css']
})
export class FeriadoComponent extends GenericListComponent<Feriado, FeriadoFilter, FeriadoGuard> {
    
    constructor(feriadoService: FeriadoService, feriadoGuard: FeriadoGuard, router: Router) {
        super(feriadoService, new FeriadoFilter(), feriadoGuard, router);
    }
    
    setFilter() {
        this.initializerDateFilter(this.filter.getData());
        super.setFilter();
    }

}