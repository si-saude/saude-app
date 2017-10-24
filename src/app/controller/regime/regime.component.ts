import { Component } from '@angular/core';

import { Regime } from './../../model/regime';
import { RegimeService } from './regime.service';
import { RegimeFilter } from './regime.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-regime',
  templateUrl: './regime.component.html',
  styleUrls: ['./regime.component.css']
})
export class RegimeComponent extends GenericListComponent<Regime, RegimeFilter> {

  constructor(service: RegimeService) {
      let regimeFilter: RegimeFilter = new RegimeFilter();
      super(service, regimeFilter);
  }
  
}