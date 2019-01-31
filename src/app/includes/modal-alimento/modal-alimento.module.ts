import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";

import { ModalAlimentoComponent } from './modal-alimento.component';

@NgModule({
  declarations: [
    ModalAlimentoComponent
  ],
  imports: [
    MaterializeModule,
    FormsModule,
    DataTableModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ModalAlimentoComponent
  ]
})
export class ModalAlimentoModule { }