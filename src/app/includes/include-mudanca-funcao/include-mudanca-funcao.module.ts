import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncludeSharedModule } from './../../controller/include-shared.module';
import { IncludeMudancaFuncaoComponent } from './include-mudanca-funcao.component';
import { ModalDisplayTextModule } from './../modal-display-text/modal-display-text.module';

@NgModule({
  declarations: [
    IncludeMudancaFuncaoComponent
  ],
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule,
    IncludeSharedModule,
    ModalDisplayTextModule
  ],
  exports: [
    IncludeMudancaFuncaoComponent
  ]
})
export class IncludeMudancaFuncaoModule { }