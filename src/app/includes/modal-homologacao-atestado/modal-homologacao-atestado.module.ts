import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';

import { ModalHomologacaoAtestadoComponent } from './modal-homologacao-atestado.component';
import { PipesModule } from './../../controller/pipes.module';

@NgModule({
  declarations: [
    ModalHomologacaoAtestadoComponent
  ],
  imports: [
    PipesModule,
    MaterializeModule,
    FormsModule,
    CommonModule,
    MyDatePickerModule,
    RouterModule
  ],
  exports: [
    ModalHomologacaoAtestadoComponent
  ]
})
export class ModalHomologacaoAtestadoModule { }