import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { MyDatePickerModule } from 'mydatepicker';

import { AtendimentoService } from './atendimento.service';
import { AtendimentoFormComponent } from './atendimento-form/atendimento-form.component';
import { AtendimentoComponent } from './atendimento.component';
import { AtendimentoRoutingModule } from './atendimento.routing.module';
import { PlanejamentoModule } from './../planejamento.module';
import { SharedModule } from './../shared.module';
import { FichaColetaModule } from './../ficha-coleta.module';
import { TriagemModule } from './../triagem.module';
import { AcolhimentoModule } from './../acolhimento.module';

@NgModule({
    declarations: [
       AtendimentoFormComponent,
       AtendimentoComponent
     ],
     imports: [
        CommonModule,
        AtendimentoRoutingModule,
        MyDatePickerModule,
        SharedModule,
        PlanejamentoModule,
        FichaColetaModule,
        TriagemModule,
        AcolhimentoModule
     ],
     providers: [
        AtendimentoService
     ]
})
export class AtendimentoModule{}