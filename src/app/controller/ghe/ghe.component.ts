import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from './../../global';
import { MaterializeAction } from "angular2-materialize";

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
        this.filter = this.filtro;
        this.initializerDateFilter(this.filter.getDataCriacao());
        this.initializerDateFilter(this.filter.getDataDesativacao());
        this.setFilter();
    }
}
