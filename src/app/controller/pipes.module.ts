import { NgModule } from '@angular/core';

import { FilterDataPipe } from './../pipes/filter-data.pipe';
import { DateHourPipe } from './../pipes/date-hour.pipe';
import { TransformDatePipe } from './../pipes/transform-date.pipe';

@NgModule({
  declarations: [
    FilterDataPipe,
    DateHourPipe,
    TransformDatePipe
  ],
  exports: [
    FilterDataPipe,
    DateHourPipe,
    TransformDatePipe
  ]
})
export class PipesModule { }