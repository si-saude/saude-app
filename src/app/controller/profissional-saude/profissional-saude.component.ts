import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { ProfissionalSaude } from './../../model/profissional-saude';
import { ProfissionalSaudeService } from './profissional-saude.service';
import { ProfissionalSaudeFilter } from './profissional-saude.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-profissional-saude',
  templateUrl: './profissional-saude.component.html',
  styleUrls: ['./profissional-saude.component.css']
})
export class ProfissionalSaudeComponent extends GenericListComponent<ProfissionalSaude, ProfissionalSaudeFilter> {

    constructor(profissionalSaudeService: ProfissionalSaudeService, 
            formBuilder: FormBuilder) { 
        super(profissionalSaudeService, formBuilder);
    }

      
  }