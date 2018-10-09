import { NgModule } from '@angular/core';

import { FilterDataPipe } from './../pipes/filter-data.pipe';
import { DateHourPipe } from './../pipes/date-hour.pipe';
import { TransformDatePipe } from './../pipes/transform-date.pipe';
import { CellPhonePipe } from './../pipes/cell-phone.pipe';
import { CnpjPipe } from './../pipes/cnpj.pipe';
import { CepPipe } from './../pipes/cep.pipe';
import { MoneyPipe } from './../pipes/money.pipe';

@NgModule({
  declarations: [
    FilterDataPipe,
    DateHourPipe,
    TransformDatePipe,
    CellPhonePipe,
    CnpjPipe,
    CepPipe,
    MoneyPipe
  ],
  exports: [
    FilterDataPipe,
    DateHourPipe,
    TransformDatePipe,
    CellPhonePipe,
    CnpjPipe,
    CepPipe,
    MoneyPipe
  ]
})
export class PipesModule { }