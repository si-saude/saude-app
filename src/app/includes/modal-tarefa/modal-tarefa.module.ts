import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";
import { MyDatePickerModule } from 'mydatepicker';

import { ModalTarefaComponent } from './modal-tarefa.component';
import { PipesModule } from './../../controller/pipes.module';

@NgModule({
  declarations: [
    ModalTarefaComponent
  ],
  imports: [
    PipesModule,
    MaterializeModule,
    FormsModule,
    DataTableModule,
    CommonModule,
    MyDatePickerModule,
    RouterModule
  ],
  exports: [
    ModalTarefaComponent
  ]
})
export class ModalTarefaModule { }