import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomologacaoAtestadoComponent } from './homologacao-atestado.component';
import { PipesModule } from './../../controller/pipes.module';
import { IncludeSharedModule } from './../../controller/include-shared.module';

@NgModule({
  declarations: [
    HomologacaoAtestadoComponent
  ],
  imports: [
    PipesModule,
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule,
    IncludeSharedModule
  ],
  exports: [
    HomologacaoAtestadoComponent
  ]
})
export class HomologacaoAtestadoModule { }