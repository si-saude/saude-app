import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FichaColetaComponent } from './../includes/ficha-coleta/ficha-coleta.component';
import { PipesModule } from './pipes.module';
import { NumberMaskDirectiveModule } from '../directives/number-mask-directive/number-mask-directive.module';

@NgModule({
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule,
    PipesModule,
    NumberMaskDirectiveModule
  ],
  declarations: [
    FichaColetaComponent
  ],
  exports: [
    FichaColetaComponent
  ]
})
export class FichaColetaModule { }