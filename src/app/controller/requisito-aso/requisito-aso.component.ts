import { Component } from '@angular/core';

import { RequisitoAso } from './../../model/requisito-aso';
import { RequisitoAsoService } from './requisito-aso.service';
import { RequisitoAsoFilter } from './requisito-aso.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { RequisitoAsoGuard } from './../../guards/guards-child/requisito-aso.guard';

@Component({
  selector: 'app-requisito-aso',
  templateUrl: './requisito-aso.component.html',
  styleUrls: ['./requisito-aso.component.css', '../../../assets/css/list-component.css']
})
export class RequisitoAsoComponent 
    extends GenericListComponent<RequisitoAso, RequisitoAsoFilter, RequisitoAsoGuard> {

  constructor(service: RequisitoAsoService, requisitoGuard: RequisitoAsoGuard) {
      super(service, new RequisitoAsoFilter(), requisitoGuard);
  }
  
}