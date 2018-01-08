import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { AuditoriaResultadoExameComponent } from './auditoria-resultado-exame.component';
import { EmpregadoConvocacaoService } from './../empregado-convocacao/empregado-convocacao.service';
import { AuditoriaResultadoExameRoutingModule } from './auditoria-resultado-exame.routing.module';
import { SharedModule } from './../shared.module';
import { AuditoriaResultadoExameFormComponent } from './auditoria-resultado-exame-form/auditoria-resultado-exame-form.component';
import { AuditoriaResultadoExameFormDetailComponent } from './auditoria-resultado-exame-form/auditoria-resultado-exame-form-detail.component';


@NgModule({
    declarations: [
       AuditoriaResultadoExameComponent,
       AuditoriaResultadoExameFormComponent,
       AuditoriaResultadoExameFormDetailComponent
     ],
     imports: [
        AuditoriaResultadoExameRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        EmpregadoConvocacaoService
     ]
})
export class AuditoriaResultadoExameModule{}