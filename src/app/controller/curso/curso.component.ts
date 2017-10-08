import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Curso } from './../../model/curso';
import { CursoService } from './curso.service';
import { CursoFilter } from './curso.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent extends GenericListComponent<Curso,CursoFilter> {
  
  constructor(cursoService: CursoService, 
          formBuilder: FormBuilder) { 
      super(cursoService, formBuilder);
      this.titulo = "Curso";
      this.filter = new CursoFilter();
  }
    
}