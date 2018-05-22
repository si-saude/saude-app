import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TriagemComponent } from './../includes/triagem/triagem.component';

@NgModule({
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    TriagemComponent
  ],
  exports: [
    TriagemComponent
  ]
})
export class TriagemModule { }