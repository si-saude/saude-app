import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Gerencia } from './../../model/gerencia';
import { GerenciaService } from './gerencia.service';
import { GerenciaFilter } from './gerencia.filter';
import { GerenciaGuard } from './../../guards/guards-child/gerencia.guard';
import { GenericListComponent } from './../../generics/generic.list.component';
import { CheckboxUtil } from './../../generics/utils/checkbox.util';

@Component({
  selector: 'app-gerencia',
  templateUrl: './gerencia.component.html',
  styleUrls: ['./gerencia.component.css', '../../../assets/css/list-component.css']
})
export class GerenciaComponent  extends GenericListComponent<Gerencia, GerenciaFilter, GerenciaGuard> {
  ausentePeriodico: CheckboxUtil;

  constructor( gerenciaService: GerenciaService, gerenciaGuard: GerenciaGuard, router: Router) {
      super(gerenciaService, new GerenciaFilter(), gerenciaGuard, router);
  }
    
  ngAfterViewInit() {
      this.ausentePeriodico = new CheckboxUtil(document.getElementById("ausentePeriodico") as HTMLInputElement);
  }
  
  filtrar() {
      this.filter.getAusentePeriodico().setValue(this.ausentePeriodico.getValue());
      this.setFilter();
  }
  
}