import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';

import { ModalConfirmComponent } from './modal-confirm.component';

@NgModule({
  declarations: [
    ModalConfirmComponent
  ],
  imports: [
    MaterializeModule
  ],
  exports: [
    ModalConfirmComponent
  ]
})
export class ModalConfirmModule { }