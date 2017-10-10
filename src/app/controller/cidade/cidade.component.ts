import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { Cidade } from './../../model/cidade';
import { CidadeService } from './cidade.service';
import { CidadeFilter } from './cidade.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css']
})
export class CidadeComponent extends GenericListComponent<Cidade,CidadeFilter> {

  constructor(service: CidadeService, formBuilder: FormBuilder) { 
      super(service,formBuilder)
      this.titulo = "Funcoes";
      this.filter = new CidadeFilter();
  }
  
}