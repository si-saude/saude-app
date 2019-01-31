import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";

import { ModalObservacaoComponent } from './modal-observacao.component';

@NgModule({
  declarations: [
    ModalObservacaoComponent
  ],
  imports: [
    MaterializeModule,
    FormsModule,
    DataTableModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ModalObservacaoComponent
  ]
})
export class ModalObservacaoModule { }