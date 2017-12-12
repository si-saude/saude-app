import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { LocalizacaoFilter } from './localizacao.filter';
import { LocalizacaoService } from './localizacao.service';
import { Localizacao } from './../../model/localizacao';
import { LocalizacaoGuard } from './../../guards/guards-child/localizacao.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css', '../../../assets/css/list-component.css']
})
export class LocalizacaoComponent extends GenericListComponent<Localizacao, LocalizacaoFilter, LocalizacaoGuard> {

  constructor(localizacaoService: LocalizacaoService, localizacaoGuard: LocalizacaoGuard) {
      super(localizacaoService, new LocalizacaoFilter(), localizacaoGuard);
  }
  
}