import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AtendimentoInformacoesEmpregadoComponent } from './atendimento-informacoes-empregado.component';

@NgModule({
  declarations: [
    AtendimentoInformacoesEmpregadoComponent
  ],
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    AtendimentoInformacoesEmpregadoComponent
  ]
})
export class AtendimentoInformacoesEmpregadoModule { }