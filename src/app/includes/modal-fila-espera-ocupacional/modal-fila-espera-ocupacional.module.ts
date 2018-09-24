import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";
import { ModalFilaEsperaOcupacionalComponent } from './modal-fila-espera-ocupacional.component';
import { ConfirmSaveModule} from './../confirm-save/confirm-save.module';
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
    RouterModule,
    ConfirmSaveModule
  ],
  exports: [
    ModalFilaEsperaOcupacionalComponent
  ]
})
export class ModalFilaEsperaOcupacionalModule { }