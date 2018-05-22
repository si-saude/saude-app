import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Cidade } from './../../model/cidade';
import { CidadeService } from './cidade.service';
import { CidadeFilter } from './cidade.filter';
import { CidadeGuard } from './../../guards/guards-child/cidade.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css', '../../../assets/css/list-component.css']
})
export class CidadeComponent extends GenericListComponent<Cidade, CidadeFilter, CidadeGuard> {

  constructor(service: CidadeService, cidadeGuard: CidadeGuard, router: Router) {
      super(service, new CidadeFilter(), cidadeGuard, router);
  }
  
}