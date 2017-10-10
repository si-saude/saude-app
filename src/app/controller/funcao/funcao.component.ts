import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Funcao } from './../../model/funcao';
import { FuncaoService } from './funcao.service';
import { FuncaoFilter } from './funcao.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-funcao',
  templateUrl: './funcao.component.html',
  styleUrls: ['./funcao.component.css']
})
export class FuncaoComponent  extends GenericListComponent<Funcao,FuncaoFilter> {

    constructor(funcaoService: FuncaoService, 
          formBuilder: FormBuilder) { 
      super(funcaoService, formBuilder);
  }
    
}