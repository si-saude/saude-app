import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { MyDatePickerModule } from 'mydatepicker';

import { FeriadoComponent } from './feriado.component';
import { FeriadoService } from './feriado.service';
import { FeriadoRoutingModule } from './feriado.routing.module';
import { SharedModule } from './../shared.module';
import { FeriadoFormComponent } from './feriado-form/feriado-form.component';
import { FeriadoFormDetailComponent } from './feriado-form/feriado-form-detail.component';

@NgModule({
    declarations: [
       FeriadoComponent,
       FeriadoFormComponent,
       FeriadoFormDetailComponent
     ],
     imports: [
        FeriadoRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        FeriadoService
     ]
})
export class FeriadoModule{}