import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global'; 
import { Usuario } from './../../model/usuario';
import { LocalizacaoFilter } from './localizacao.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class LocalizacaoService extends GenericService{

  constructor( http: Http,  router: Router) {
      super(http, router, "localizacao");
  }

}