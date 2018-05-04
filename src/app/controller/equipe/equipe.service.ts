import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { EquipeFilter } from './equipe.filter';
import { EmpregadoService } from './../empregado/empregado.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class EquipeService extends GenericService{

  constructor(http: Http, router: Router,
          private empregadoService: EmpregadoService) { 
      super(http,router,"equipe");
  }
  
  getEquipes() {
      return this.selectList(new EquipeFilter());
  }
  
  getEquipesWithFilter( equipeFilter ) {
      return this.selectList( equipeFilter );
  }
  
  getEquipeByName( nome ) {
      let equipeFilter: EquipeFilter = new EquipeFilter();
      equipeFilter.setNome(nome);
      
      return this.selectList(equipeFilter);
  }
  
}