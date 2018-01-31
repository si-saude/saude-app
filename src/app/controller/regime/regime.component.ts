import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Regime } from './../../model/regime';
import { RegimeService } from './regime.service';
import { RegimeFilter } from './regime.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { RegimeGuard } from './../../guards/guards-child/regime.guard';

@Component({
  selector: 'app-regime',
  templateUrl: './regime.component.html',
  styleUrls: ['./regime.component.css', '../../../assets/css/list-component.css']
})
export class RegimeComponent extends GenericListComponent<Regime, RegimeFilter, RegimeGuard> {

  constructor(service: RegimeService, regimeGuard: RegimeGuard, router: Router) {
      super(service, new RegimeFilter(), regimeGuard, router);
  }
  
}