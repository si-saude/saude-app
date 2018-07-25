import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";

import { ModalFilaAtendimentoOcupacionalComponent } from './modal-fila-atendimento-ocupacional.component';
import { PipesModule } from './../../controller/pipes.module';

@NgModule({
  declarations: [
    ModalFilaAtendimentoOcupacionalComponent
  ],
  imports: [
    PipesModule,
    MaterializeModule,
    FormsModule,
    DataTableModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ModalFilaAtendimentoOcupacionalComponent
  ]
})
export class ModalFilaAtendimentoOcupacionalModule { }