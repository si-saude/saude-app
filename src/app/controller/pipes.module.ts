import { NgModule } from '@angular/core';

import { FilterDataPipe } from './../pipes/filter-data.pipe';
import { DateHourPipe } from './../pipes/date-hour.pipe';
import { TransformDatePipe } from './../pipes/transform-date.pipe';
import { CellPhonePipe } from './../pipes/cell-phone.pipe';

@NgModule({
  declarations: [
    FilterDataPipe,
    DateHourPipe,
    TransformDatePipe,
    CellPhonePipe
  ],
  exports: [
    FilterDataPipe,
    DateHourPipe,
    TransformDatePipe,
    CellPhonePipe
  ]
})
export class PipesModule { }