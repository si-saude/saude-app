import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { ConvocacaoComponent } from './convocacao.component';
import { ConvocacaoService } from './convocacao.service';
import { ConvocacaoFormComponent } from './convocacao-form/convocacao-form.component';
import { ConvocacaoFormDetailComponent } from './convocacao-form/convocacao-form-detail.component';
import { ConvocacaoRoutingModule } from './convocacao.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       ConvocacaoComponent,
       ConvocacaoFormComponent,
       ConvocacaoFormDetailComponent
     ],
     imports: [
        ConvocacaoRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        ConvocacaoService
     ]
})
export class ConvocacaoModule{}