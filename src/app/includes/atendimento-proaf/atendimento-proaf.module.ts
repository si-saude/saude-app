import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AtendimentoProafComponent } from './atendimento-proaf.component';
import { NumberMaskDirectiveModule } from './../../directives/number-mask-directive/number-mask-directive.module';

@NgModule({
  declarations: [
    AtendimentoProafComponent
  ],
  imports:[
    FormsModule,
    CommonModule,
    RouterModule,
    MaterializeModule,
    NumberMaskDirectiveModule
    ],
  exports: [
    AtendimentoProafComponent
  ]
})
export class AtendimentoProafModule { }