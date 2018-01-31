import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RegraAtendimento } from './../../model/regra-atendimento';
import { RegraAtendimentoService } from './regra-atendimento.service';
import { RegraAtendimentoFilter } from './regra-atendimento.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { RegraAtendimentoGuard } from './../../guards/guards-child/regra-atendimento.guard';

@Component({
  selector: 'app-regra-atendimento',
  templateUrl: './regra-atendimento.component.html',
  styleUrls: ['./regra-atendimento.component.css', '../../../assets/css/list-component.css']
})
export class RegraAtendimentoComponent extends GenericListComponent<RegraAtendimento, RegraAtendimentoFilter, RegraAtendimentoGuard> {

  constructor(service: RegraAtendimentoService, regraAtendimentoGuard: RegraAtendimentoGuard, router: Router) {
      super(service, new RegraAtendimentoFilter(), regraAtendimentoGuard, router);
  }
  
}