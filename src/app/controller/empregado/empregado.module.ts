import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { EmpregadoComponent } from './empregado.component';
import { EmpregadoService } from './empregado.service';
import { EmpregadoRoutingModule } from './empregado.routing.module';
import { SharedModule } from './../shared.module';
import { EmpregadoFormComponent } from './empregado-form/empregado-form.component';
import { EmpregadoFormDetailComponent } from './empregado-form/empregado-form-detail.component';

@NgModule({
    declarations: [
       EmpregadoComponent,
       EmpregadoFormComponent,
       EmpregadoFormDetailComponent
     ],
     imports: [
        EmpregadoRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        EmpregadoService
     ]
})
export class EmpregadoModule{}