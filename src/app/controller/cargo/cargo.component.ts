import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Cargo } from './../../model/cargo';
import { CargoService } from './cargo.service';
import { CargoFilter } from './cargo.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent extends GenericListComponent<Cargo, CargoFilter> {

    constructor(service: CargoService) {
      let cargoFilter: CargoFilter = new CargoFilter();
      super(service, cargoFilter);
  }
    
}