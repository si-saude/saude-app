import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';
import { MyDatePickerModule } from 'mydatepicker';

import { SharedModule } from './../shared.module';
import { VacinaService } from './vacina.service';

@NgModule({
    declarations: [
     ],
     imports: [
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        VacinaService
     ]
})
export class VacinaModule{}