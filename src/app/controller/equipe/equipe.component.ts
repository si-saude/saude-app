import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { EquipeFilter } from './equipe.filter';
import { EquipeService } from './equipe.service';
import { GenericListComponent } from './../../generics/generic.list.component';
import { Equipe } from './../../model/equipe';

@Component( {
    selector: 'app-equipe',
    templateUrl: './equipe.component.html',
    styleUrls: ['./equipe.component.css', '../../../assets/css/list-component.css']
} )
export class EquipeComponent extends GenericListComponent<Equipe, EquipeFilter>  {

    constructor( equipeService: EquipeService) {
        let equipeFilter: EquipeFilter = new EquipeFilter(); 
        super(equipeService, equipeFilter);
    }

}










