import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { DataTableModule } from "angular2-datatable";
import { MaterializeModule } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';

import { EmpregadosPorGrupoComponent } from './empregados-por-grupo/empregados-por-grupo.component';
import { EmpregadosPorGrupoService } from './empregados-por-grupo/empregados-por-grupo.service';
import { PanoramaComponent } from './panorama/panorama.component';
import { SolicitacaoCentralIntegraComponent } from './solicitacao-central-integra/solicitacao-central-integra.component';
import { AtestadoComponent } from './atestado/atestado.component';
import { CatComponent } from './cat/cat.component';
import { AvaliacaoHigieneOcupacionalComponent } from './avaliacao-higiene-ocupacional/avaliacao-higiene-ocupacional.component';
import { PreRequisitosAgendamentoComponent } from './pre-requisitos-agendamento/pre-requisitos-agendamento.component';
import { PanoramaService } from './panorama/panorama.service';
import { AtestadoService } from './atestado/atestado.service';
import { CatService } from './cat/cat.service';
import { PreRequisitosAgendamentoService } from './pre-requisitos-agendamento/pre-requisitos-agendamento.service';
import { ReportsRoutingModule } from './reports.routing.module';
import { SharedModule } from './../controller/shared.module';
import { PipesModule } from './../controller/pipes.module';
import { ModalAvaliacaoHigieneOcupacionalModule } from './../controller/modal-avaliacao-higiene-ocupacional.module';

@NgModule({
    declarations: [
       EmpregadosPorGrupoComponent,
       PanoramaComponent,
       SolicitacaoCentralIntegraComponent,
       AtestadoComponent,
       CatComponent,
       AvaliacaoHigieneOcupacionalComponent,
       PreRequisitosAgendamentoComponent
     ],
     imports: [
        ReportsRoutingModule,
        DataTableModule,
        SharedModule,
        MyDatePickerModule,
        MaterializeModule,
        PipesModule,
        ModalAvaliacaoHigieneOcupacionalModule
     ],
     providers: [
        EmpregadosPorGrupoService,
        PanoramaService,
        AtestadoService,
        CatService,
        PreRequisitosAgendamentoService
     ]
})
export class ReportsModule{}