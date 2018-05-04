import { Component, EventEmitter, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import {MaterializeDirective,MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Perfil } from './../../model/perfil';
import { PerfilService } from './perfil.service';
import { PerfilFilter } from './perfil.filter';
import { PerfilGuard } from './../../guards/guards-child/perfil.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css', '../../../assets/css/list-component.css']
})
export class PerfilComponent  extends GenericListComponent<Perfil, PerfilFilter, PerfilGuard>{
    
  constructor( perfilService: PerfilService, perfilGuard: PerfilGuard, router: Router) {
      super(perfilService, new PerfilFilter(), perfilGuard, router);
  }
    
}