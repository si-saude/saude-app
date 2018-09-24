import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IncludeMudancaFuncaoComponent } from './include-mudanca-funcao.component';

@NgModule({
  declarations: [
    IncludeMudancaFuncaoComponent
  ],
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    IncludeMudancaFuncaoComponent
  ]
})
export class IncludeMudancaFuncaoModule { }