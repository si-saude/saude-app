import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';

import { ModalDisplayTextComponent } from './modal-display-text.component';

@NgModule({
  declarations: [
    ModalDisplayTextComponent
  ],
  imports: [
    MaterializeModule
  ],
  exports: [
    ModalDisplayTextComponent
  ]
})
export class ModalDisplayTextModule { }