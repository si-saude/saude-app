import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { AtendimentoService } from './atendimento.service';
import { AtendimentoFormComponent } from './atendimento-form/atendimento-form.component';
import { AtendimentoRoutingModule } from './atendimento.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       AtendimentoFormComponent
     ],
     imports: [
        AtendimentoRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        AtendimentoService
     ]
})
export class AtendimentoModule{}