import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalAvaliacaoHigieneOcupacionalComponent } from './../includes/modal-avaliacao-higiene-ocupacional/modal-avaliacao-higiene-ocupacional.component';
import { PipesModule } from './pipes.module';

@NgModule({
  declarations: [
    ModalAvaliacaoHigieneOcupacionalComponent
  ],
  imports: [
    PipesModule,
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ModalAvaliacaoHigieneOcupacionalComponent
  ]
})
export class ModalAvaliacaoHigieneOcupacionalModule { }