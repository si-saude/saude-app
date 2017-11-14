import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Convocacao } from './../../model/convocacao';
import { ConvocacaoService } from './convocacao.service';
import { ConvocacaoFilter } from './convocacao.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-convocacao',
  templateUrl: './convocacao.component.html',
  styleUrls: ['./convocacao.component.css']
})
export class ConvocacaoComponent extends GenericListComponent<Convocacao, ConvocacaoFilter> {

    constructor(service: ConvocacaoService) {
      let convocacaoFilter: ConvocacaoFilter = new ConvocacaoFilter();
      super(service, convocacaoFilter);
  }
    
}