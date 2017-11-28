import { Component, EventEmitter, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective,MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Perfil } from './../../model/perfil';
import { PerfilService } from './perfil.service';
import { PerfilFilter } from './perfil.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css', '../../../assets/css/list-component.css']
})
export class PerfilComponent  extends GenericListComponent<Perfil, PerfilFilter>{
    
  constructor( perfilService: PerfilService) {
      let perfilFilter: PerfilFilter = new PerfilFilter();
      super(perfilService, perfilFilter);
  }
    
}