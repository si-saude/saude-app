import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { LocalizacaoFilter } from './localizacao.filter';
import { RegraAtendimentoService } from './../regra-atendimento/regra-atendimento.service';
import { ServicoService } from './../servico/servico.service';
import { ServicoFilter } from './../servico/servico.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class LocalizacaoService extends GenericService{

  constructor( http: Http,  router: Router,
          private servicoService: ServicoService,
          private regraAtendimentoService: RegraAtendimentoService) {
      super(http, router, "localizacao");
  }

  getLocalizacoes() {
      return this.selectList(new LocalizacaoFilter());
  }
  
  getRegraAtendimentos() {
      return this.regraAtendimentoService.getRegras();
  }
  
  getServicos() {
      let servicoFilter: ServicoFilter = new ServicoFilter();
      servicoFilter.setGrupo("ATENDIMENTO OCUPACIONAL");
      
      return this.servicoService.selectList(servicoFilter);
  }
  
}