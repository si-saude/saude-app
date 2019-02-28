import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TriagemComponent } from './triagem.component';

@NgModule({
  declarations: [
    TriagemComponent
  ],
  imports:[
    FormsModule,
    CommonModule,
    RouterModule,
    MaterializeModule
    ],
  exports: [
    TriagemComponent
  ]
})
export class TriagemModule { }