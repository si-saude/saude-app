import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { MyDatePickerModule } from 'mydatepicker';
import { DataTableModule } from "angular2-datatable";

import { AtendimentoService } from './atendimento.service';
import { AtendimentoFormComponent } from './atendimento-form/atendimento-form.component';
import { AtendimentoComponent } from './atendimento.component';
import { AtendimentoRoutingModule } from './atendimento.routing.module';
import { FilterDataPipe } from './../../pipes/filter-data.pipe';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       AtendimentoFormComponent,
       AtendimentoComponent,
       FilterDataPipe
     ],
     imports: [
        CommonModule,
        AtendimentoRoutingModule,
        MyDatePickerModule,
        DataTableModule,
        SharedModule
     ],
     providers: [
        AtendimentoService
     ]
})
export class AtendimentoModule{}