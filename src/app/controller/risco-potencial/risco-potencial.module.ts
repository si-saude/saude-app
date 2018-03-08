import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { RiscoPotencialComponent } from './risco-potencial.component';
import { RiscoPotencialService } from './risco-potencial.service';
//import { RiscoPotencialFormComponent } from './risco-potencial-form/risco-potencial-form.component';
//import { RiscoPotencialFormDetailComponent } from './risco-potencial-form/risco-potencial-form-detail.component';
import { RiscoPotencialRoutingModule } from './risco-potencial.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       RiscoPotencialComponent,
//       RiscoPotencialFormComponent,
//       RiscoPotencialFormDetailComponent
     ],
     imports: [
        RiscoPotencialRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        RiscoPotencialService
     ]
})

export class RiscoPotencialModule{}