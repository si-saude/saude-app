import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";

import { ModalExameComponent } from './modal-exame.component';
import { PipesModule } from './../../controller/pipes.module';

@NgModule({
  declarations: [
    ModalExameComponent
  ],
  imports: [
    PipesModule,
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule,
    DataTableModule
  ],
  exports: [
    ModalExameComponent
  ]
})
export class ModalExameModule { }