import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";

import { ModalAcaoComponent } from './modal-acao.component';
import { PipesModule } from './../../controller/pipes.module';

@NgModule({
  declarations: [
    ModalAcaoComponent
  ],
  imports: [
    PipesModule,
    MaterializeModule,
    FormsModule,
    DataTableModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    ModalAcaoComponent
  ]
})
export class ModalAcaoModule { }