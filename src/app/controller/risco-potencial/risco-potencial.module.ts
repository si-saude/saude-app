import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { ChartsModule } from 'ng2-charts';
import { DataTableModule } from "angular2-datatable";

import { RiscoPotencialComponent } from './risco-potencial.component';
import { TriagemComponent } from './triagem/triagem.component';
import { TriagemReavaliacaoComponent } from './triagem-reavaliacao/triagem-reavaliacao.component';
import { GraficosComponent } from './graficos/graficos.component';
import { AcoesComponent } from './acoes/acoes.component';
import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';
import { FichaColetaComponent } from './ficha-coleta/ficha-coleta.component';
import { PlanoIntervencaoComponent } from './plano-intervencao/plano-intervencao.component';
import { PlanejamentoComponent } from './planejamento/planejamento.component';
import { CriarPlanoComponent } from './criar-plano/criar-plano.component';
import { RiscoPotencialService } from './risco-potencial.service';
import { RiscoEmpregadoService } from './../risco-empregado/risco-empregado.service';
import { RiscoPotencialRoutingModule } from './risco-potencial.routing.module';
import { TransformDatePipe } from './../../pipes/transform-date.pipe';
import { SharedModule } from './../shared.module';
import { FilterDataPipe } from './../../pipes/filter-data.pipe';

@NgModule({
    declarations: [
       RiscoPotencialComponent,
       TriagemComponent,
       AcoesComponent,
       AcompanhamentoComponent,
       FichaColetaComponent,
       PlanoIntervencaoComponent,
       PlanejamentoComponent,
       GraficosComponent,
       CriarPlanoComponent,
       TransformDatePipe,
       TriagemReavaliacaoComponent,
       FilterDataPipe
     ],
     imports: [
        RiscoPotencialRoutingModule,
        MyDatePickerModule,
        ChartsModule,
        DataTableModule,
        SharedModule
     ],
     providers: [
        RiscoPotencialService,
        RiscoEmpregadoService
     ]
})

export class RiscoPotencialModule{}