import { Component } from '@angular/core';

import { Funcao } from './../../model/funcao';
import { FuncaoService } from './funcao.service';
import { FuncaoFilter } from './funcao.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-funcao',
  templateUrl: './funcao.component.html',
  styleUrls: ['./funcao.component.css', '../../../assets/css/list-component.css']
})
export class FuncaoComponent extends GenericListComponent<Funcao, FuncaoFilter> {

  constructor(service: FuncaoService) {
      let funcaoFilter: FuncaoFilter = new FuncaoFilter();
      super(service, funcaoFilter);
  }
  
}