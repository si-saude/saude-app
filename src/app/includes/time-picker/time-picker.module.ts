import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { TimePickerComponent } from './time-picker.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TimeMaskDirective } from './time-mask-directive'; 

@NgModule( {
    declarations: [
        TimePickerComponent,
        TimeMaskDirective
    ],
    imports: [
        FormsModule,
        CommonModule,
        MaterializeModule
    ],
    exports: [
        TimePickerComponent
    ]
} )
export class TimePickerModule { }