import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ModalMessageComponent } from './modal-message.component';

@NgModule({
  declarations: [
    ModalMessageComponent
  ],
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    ModalMessageComponent
  ]
})
export class ModalMessageModule { }