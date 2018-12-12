import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalDisplayTextModule } from './../modal-display-text/modal-display-text.module';

import { InformacaoEmpregadoComponent } from './informacao-empregado.component';

@NgModule({
  declarations: [
    InformacaoEmpregadoComponent
  ],
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ModalDisplayTextModule
  ],
  exports: [
    InformacaoEmpregadoComponent
  ]
})
export class InformacaoEmpregadoModule { }