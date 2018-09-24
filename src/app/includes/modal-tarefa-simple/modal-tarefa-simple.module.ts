import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";

import { ModalTarefaSimpleComponent } from './modal-tarefa-simple.component';
import { PipesModule } from './../../controller/pipes.module';
import { IncludeSharedModule } from './../../controller/include-shared.module';
import { TarefaService } from './../../controller/tarefa/tarefa.service';

@NgModule({
  declarations: [
    ModalTarefaSimpleComponent
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
    ModalTarefaSimpleComponent
  ],
  providers: [
      TarefaService
   ]
})
export class ModalTarefaSimpleModule { }