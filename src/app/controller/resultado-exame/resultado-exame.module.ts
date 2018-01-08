import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { ResultadoExameComponent } from './resultado-exame.component';
import { ResultadoExameService } from './resultado-exame.service';
import { ResultadoExameRoutingModule } from './resultado-exame.routing.module';
import { ResultadoExameFormDetailComponent } from './resultado-exame-form/resultado-exame-form-detail.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       ResultadoExameComponent,
       ResultadoExameFormDetailComponent
     ],
     imports: [
        ResultadoExameRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        ResultadoExameService
     ]
})
export class ResultadoExameModule{}