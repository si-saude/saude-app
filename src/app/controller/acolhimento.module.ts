import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncludeSharedModule } from './include-shared.module';


import { AcolhimentoComponent } from './../includes/acolhimento/acolhimento.component';

@NgModule({
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule,
    IncludeSharedModule    
  ],
  declarations: [
    AcolhimentoComponent
  ],
  exports: [
    AcolhimentoComponent
  ]
})
export class AcolhimentoModule { }