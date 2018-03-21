import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { RiscoPotencialComponent } from './risco-potencial.component';
import { TriagemComponent } from './triagem/triagem.component';
import { AcoesComponent } from './acoes/acoes.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { AcolhimentoComponent } from './acolhimento/acolhimento.component';
import { PlanejamentoComponent } from './planejamento/planejamento.component';
import { RiscoPotencialService } from './risco-potencial.service';
import { RiscoPotencialRoutingModule } from './risco-potencial.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       RiscoPotencialComponent,
       TriagemComponent,
       AcoesComponent,
       AvaliacaoComponent,
       AcolhimentoComponent,
       PlanejamentoComponent
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