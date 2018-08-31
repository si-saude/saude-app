import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";

import { ModalTarefaComponent } from './modal-tarefa.component';
import { PipesModule } from './../../controller/pipes.module';
import { IncludeSharedModule } from './../../controller/include-shared.module';

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
    RouterModule,
    IncludeSharedModule
  ],
  exports: [
    ModalTarefaComponent
  ]
})
export class ModalTarefaModule { }