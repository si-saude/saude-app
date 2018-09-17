import { NgModule } from '@angular/core';
import { DatePickerModule } from './../includes/date-picker/date-picker.module';



@NgModule({
  imports: [ 
    DatePickerModule
  ],
  exports: [ 
    DatePickerModule
  ]
})
export class IncludeSharedModule { }