import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Funcao } from './../../model/funcao';
import { FuncaoService } from './funcao.service';
import { FuncaoFilter } from './funcao.filter';
import { FuncaoGuard } from './../../guards/guards-child/funcao.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-funcao',
  templateUrl: './funcao.component.html',
  styleUrls: ['./funcao.component.css', '../../../assets/css/list-component.css']
})
export class FuncaoComponent extends GenericListComponent<Funcao, FuncaoFilter, FuncaoGuard> {

  constructor(service: FuncaoService, funcaoGuard: FuncaoGuard, router: Router ) {
      super(service, new FuncaoFilter(), funcaoGuard, router );
  }
  
}