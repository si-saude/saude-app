import { Component } from '@angular/core';

import { Vacina } from './../../model/vacina';
import { VacinaService } from './vacina.service';
import { VacinaFilter } from './vacina.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.css']
})
export class VacinaComponent extends GenericListComponent<Vacina, VacinaFilter> {

  constructor(service: VacinaService) {
      let vacinaFilter: VacinaFilter = new VacinaFilter();
      super(service, vacinaFilter);
  }
  
}