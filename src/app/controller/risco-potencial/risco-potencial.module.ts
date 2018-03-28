import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { RiscoPotencialComponent } from './risco-potencial.component';
import { TriagemComponent } from './triagem/triagem.component';
import { AcoesComponent } from './acoes/acoes.component';
import { FichaColetaComponent } from './ficha-coleta/ficha-coleta.component';
import { PlanoIntervencaoComponent } from './plano-intervencao/plano-intervencao.component';
import { PlanejamentoComponent } from './planejamento/planejamento.component';
import { CriarPlanoComponent } from './criar-plano/criar-plano.component';
import { RiscoPotencialService } from './risco-potencial.service';
import { RiscoEmpregadoService } from './../risco-empregado/risco-empregado.service';
import { RiscoPotencialRoutingModule } from './risco-potencial.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       RiscoPotencialComponent,
       TriagemComponent,
       AcoesComponent,
       FichaColetaComponent,
       PlanoIntervencaoComponent,
       PlanejamentoComponent,
       CriarPlanoComponent
     ],
     imports: [
        RiscoPotencialRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        RiscoPotencialService,
        RiscoEmpregadoService
     ]
})

export class RiscoPotencialModule{}