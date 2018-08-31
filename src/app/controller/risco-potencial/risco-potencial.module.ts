import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { DataTableModule } from "angular2-datatable";

import { RiscoPotencialComponent } from './risco-potencial.component';
import { TriagemReavaliacaoComponent } from './triagem-reavaliacao/triagem-reavaliacao.component';
import { GraficosComponent } from './graficos/graficos.component';
import { TriagemComponent } from './triagem/triagem.component';
import { FichaColetaComponent } from './ficha-coleta/ficha-coleta.component';
import { PlanejamentoComponent } from './planejamento/planejamento.component';
import { AcoesComponent } from './acoes/acoes.component';
import { AcolhimentoComponent } from './acolhimento/acolhimento.component';
import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';
import { PlanoIntervencaoComponent } from './plano-intervencao/plano-intervencao.component';
import { CriarPlanoComponent } from './criar-plano/criar-plano.component';
import { RiscoPotencialService } from './risco-potencial.service';
import { RiscoEmpregadoService } from './../risco-empregado/risco-empregado.service';
import { RiscoPotencialRoutingModule } from './risco-potencial.routing.module';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';
import { PlanejamentoModule } from './../planejamento.module';
import { TriagemModule } from './../triagem.module';
import { FichaColetaModule } from './../ficha-coleta.module';
import { AcolhimentoModule } from './../acolhimento.module';

@NgModule({
    declarations: [
       RiscoPotencialComponent,
       AcoesComponent,
       AcompanhamentoComponent,
       PlanoIntervencaoComponent,
       GraficosComponent,
       CriarPlanoComponent,
       TriagemComponent,
       TriagemReavaliacaoComponent,
       FichaColetaComponent,
       PlanejamentoComponent,
       AcolhimentoComponent
     ],
     imports: [
        SharedModule,
        TriagemModule,
        RiscoPotencialRoutingModule,
        ChartsModule,
        DataTableModule,
        PipesModule,
        PlanejamentoModule,
        FichaColetaModule,
        AcolhimentoModule
     ],
     providers: [
        RiscoPotencialService,
        RiscoEmpregadoService
     ]
})

export class RiscoPotencialModule{}