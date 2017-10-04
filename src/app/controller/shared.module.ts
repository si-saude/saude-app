import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { MensagemFormComponent } from './../includes/mensagem-form/mensagem-form.component';
import { PreloadComponent } from './../includes/preload/preload.component';

@NgModule({
  declarations: [
    MensagemFormComponent,
    PreloadComponent
  ],
  imports: [ 
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    ReactiveFormsModule
  ],
  exports: [ 
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    ReactiveFormsModule,
    MensagemFormComponent,
    PreloadComponent
  ]
})
export class SharedModule { }
