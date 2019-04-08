import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncludeSharedModule } from './../../controller/include-shared.module';
import { TimePickerModule } from './../../includes/time-picker/time-picker.module';
import { InformacaoAvaliacaoHigieneOcupacionalComponent } from './informacao-avaliacao-higiene-ocupacional.component';
import { IntegerMaskDirectiveModule } from './../../directives/integer-mask-directive/integer-mask-directive.module';

@NgModule({
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule,
    IncludeSharedModule,
    TimePickerModule,
    IntegerMaskDirectiveModule
  ],
  declarations: [
    InformacaoAvaliacaoHigieneOcupacionalComponent
  ],
  exports: [
    InformacaoAvaliacaoHigieneOcupacionalComponent
  ]
})
export class InformacaoAvaliacaoHigieneOcupacionalModule { }