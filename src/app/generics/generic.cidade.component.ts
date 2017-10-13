import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { Cidade } from './../model/cidade';
import { CidadeService } from './../controller/cidade/cidade.service';
import { CidadeFilter } from './../controller/cidade/cidade.filter';
import { GenericFormComponent } from './generic.form.component';

export abstract class GenericCidadeComponent extends GenericFormComponent<Cidade> {

    constructor( cidadeService: CidadeService) {
        super(cidadeService);
    }
    
}