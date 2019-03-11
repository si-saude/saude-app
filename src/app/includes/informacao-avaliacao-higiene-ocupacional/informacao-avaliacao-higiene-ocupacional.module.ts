import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncludeSharedModule } from './../../controller/include-shared.module';

import { InformacaoAvaliacaoHigieneOcupacionalComponent } from './informacao-avaliacao-higiene-ocupacional.component';

@NgModule({
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule,
    IncludeSharedModule
  ],
  declarations: [
    InformacaoAvaliacaoHigieneOcupacionalComponent
  ],
  exports: [
    InformacaoAvaliacaoHigieneOcupacionalComponent
  ]
})
export class InformacaoAvaliacaoHigieneOcupacionalModule { }