import { Component } from '@angular/core';

import { Criterio } from './../../model/criterio';
import { CriterioService } from './criterio.service';
import { CriterioFilter } from './criterio.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-criterio',
  templateUrl: './criterio.component.html',
  styleUrls: ['./criterio.component.css']
})
export class CriterioComponent extends GenericListComponent<Criterio, CriterioFilter> {

  constructor(service: CriterioService) {
      let criterioFilter: CriterioFilter = new CriterioFilter();
      super(service, criterioFilter);
  }
  
}