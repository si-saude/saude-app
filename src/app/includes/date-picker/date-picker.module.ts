import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { DatePickerComponent } from './date-picker.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateMaskDirective } from './date-mask-directive'; 

@NgModule( {
    declarations: [
        DatePickerComponent,
        DateMaskDirective
    ],
    imports: [
        FormsModule,
        CommonModule,
        MaterializeModule
    ],
    exports: [
        DatePickerComponent
    ]
} )
export class DatePickerModule { }