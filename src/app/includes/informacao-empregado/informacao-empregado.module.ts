import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InformacaoEmpregadoComponent } from './informacao-empregado.component';

@NgModule({
  declarations: [
    InformacaoEmpregadoComponent
  ],
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    InformacaoEmpregadoComponent
  ]
})
export class InformacaoEmpregadoModule { }