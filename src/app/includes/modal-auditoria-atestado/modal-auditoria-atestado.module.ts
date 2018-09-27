import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ModalAuditoriaAtestadoComponent } from './modal-auditoria-atestado.component';

@NgModule({
  declarations: [
    ModalAuditoriaAtestadoComponent
  ],
  imports: [
    MaterializeModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
    
  ],
  exports: [
    ModalAuditoriaAtestadoComponent
  ]
})
export class ModalAuditoriaAtestadoModule { }