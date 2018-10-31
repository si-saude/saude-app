import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuAtendimentoNutricaoComponent } from './menu-atendimento-nutricao.component';

@NgModule({
  declarations: [
    MenuAtendimentoNutricaoComponent
  ],
  imports:[
    FormsModule,
    CommonModule,
    RouterModule,
    MaterializeModule
    ],
  exports: [
    MenuAtendimentoNutricaoComponent
  ]
})
export class MenuAtendimentoNutricaoModule { }