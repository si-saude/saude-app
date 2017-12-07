import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Gerencia } from './../../model/gerencia';
import { GerenciaService } from './gerencia.service';
import { GerenciaFilter } from './gerencia.filter';
import { GerenciaGuard } from './../../guards/guards-child/gerencia.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-gerencia',
  templateUrl: './gerencia.component.html',
  styleUrls: ['./gerencia.component.css', '../../../assets/css/list-component.css']
})
export class GerenciaComponent  extends GenericListComponent<Gerencia, GerenciaFilter, GerenciaGuard> {

  constructor( gerenciaService: GerenciaService, gerenciaGuard: GerenciaGuard) {
      super(gerenciaService, new GerenciaFilter(), gerenciaGuard);
  }
    
}