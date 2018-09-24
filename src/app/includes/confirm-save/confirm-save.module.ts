import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfirmSaveComponent } from './confirm-save.component';

@NgModule({
  declarations: [
    ConfirmSaveComponent
  ],
  imports:[
    FormsModule,
    CommonModule,
    RouterModule,
    MaterializeModule
    ],
  exports: [
    ConfirmSaveComponent
  ]
})
export class ConfirmSaveModule { }