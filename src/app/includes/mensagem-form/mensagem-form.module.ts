import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MensagemFormComponent } from './mensagem-form.component';

@NgModule({
  declarations: [
    MensagemFormComponent
  ],
  imports:[
    FormsModule,
    CommonModule,
    RouterModule,
    MaterializeModule
    ],
  exports: [
    MensagemFormComponent
  ]
})
export class MensagemFormModule { }