import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../global';
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

    constructor(service: GheeService, gheeGuard: GheeGuard, router: Router) {
        super(service, new GheeFilter(), gheeGuard, router);
        
        this.filtro = new GheeFilter();
    }
    
    filtrar() {
        this.filter = this.filtro;
        this.initializerDateFilter(this.filter.getDataCriacao());
        this.initializerDateFilter(this.filter.getDataDesativacao());
        this.setFilter();
    }

}
