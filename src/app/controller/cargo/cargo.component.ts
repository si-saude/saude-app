import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Cargo } from './../../model/cargo';
import { CargoService } from './cargo.service';
import { CargoFilter } from './cargo.filter';
import { CargoGuard } from './../../guards/guards-child/cargo.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css', '../../../assets/css/list-component.css']
})
export class CargoComponent extends GenericListComponent<Cargo, CargoFilter, CargoGuard> {
    
    constructor(service: CargoService, cargoGuard: CargoGuard, router: Router) {
      super(service, new CargoFilter(), cargoGuard, router);
    }
    
}