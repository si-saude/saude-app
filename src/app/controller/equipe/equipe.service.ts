import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global'; 
import { EquipeFilter } from './equipe.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class EquipeService extends GenericService{

  constructor(http: Http, router: Router) { 
      super(http,router,"equipe");
  }
  

}