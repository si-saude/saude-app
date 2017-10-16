import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { LocalizacaoFilter } from './localizacao.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class LocalizacaoService extends GenericService{

  constructor( http: Http,  router: Router) {
      super(http, router, "localizacao");
  }

  getLocalizacoes() {
      return this.selectList(new LocalizacaoFilter());
  }
}