import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { DatePickerComponent } from './date-picker.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule( {
    declarations: [
        DatePickerComponent 
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