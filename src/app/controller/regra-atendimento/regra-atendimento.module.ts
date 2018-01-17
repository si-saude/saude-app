import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegraAtendimentoComponent } from './regra-atendimento.component';
import { RegraAtendimentoService } from './regra-atendimento.service';
import { RegraAtendimentoFormComponent } from './regra-atendimento-form/regra-atendimento-form.component';
import { RegraAtendimentoFormDetailComponent } from './regra-atendimento-form/regra-atendimento-form-detail.component';
import { RegraAtendimentoRoutingModule } from './regra-atendimento.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       RegraAtendimentoComponent,
       RegraAtendimentoFormComponent,
       RegraAtendimentoFormDetailComponent
     ],
     imports: [
        RegraAtendimentoRoutingModule,
        SharedModule
     ],
     providers: [
        RegraAtendimentoService
     ]
})
export class RegraAtendimentoModule{}