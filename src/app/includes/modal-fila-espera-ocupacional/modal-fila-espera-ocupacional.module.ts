import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";
import { MyDatePickerModule } from 'mydatepicker';

import { ModalFilaEsperaOcupacionalComponent } from './modal-fila-espera-ocupacional.component';
import { PipesModule } from './../../controller/pipes.module';

@NgModule({
  declarations: [
    ModalFilaEsperaOcupacionalComponent
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
    ModalFilaEsperaOcupacionalComponent
  ]
})
export class ModalFilaEsperaOcupacionalModule { }