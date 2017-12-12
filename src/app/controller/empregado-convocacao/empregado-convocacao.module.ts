import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { EmpregadoConvocacaoComponent } from './empregado-convocacao.component';
import { EmpregadoConvocacaoService } from './empregado-convocacao.service';
import { EmpregadoConvocacaoRoutingModule } from './empregado-convocacao.routing.module';
import { SharedModule } from './../shared.module';
import { EmpregadoConvocacaoFormComponent } from './empregado-convocacao-form/empregado-convocacao-form.component';

@NgModule({
    declarations: [
       EmpregadoConvocacaoComponent,
       EmpregadoConvocacaoFormComponent
     ],
     imports: [
        EmpregadoConvocacaoRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        EmpregadoConvocacaoService
     ]
})
export class EmpregadoConvocacaoModule{}