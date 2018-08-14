import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { DataTableModule } from "angular2-datatable";
import { MaterializeModule } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';

import { EmpregadosPorGrupoReportComponent } from './empregados-por-grupo-report/empregados-por-grupo-report.component';
import { EmpregadosPorGrupoReportService } from './empregados-por-grupo-report/empregados-por-grupo-report.service';
import { PanoramaReportComponent } from './panorama-report/panorama-report.component';
import { SolicitacaoCentralIntegraReportComponent } from './solicitacao-central-integra-report/solicitacao-central-integra-report.component';
import { AtestadoReportComponent } from './atestado-report/atestado-report.component';
import { CatReportComponent } from './cat-report/cat-report.component';
import { AvaliacaoHigieneOcupacionalReportComponent } from './avaliacao-higiene-ocupacional-report/avaliacao-higiene-ocupacional-report.component';
import { PreRequisitosAgendamentoReportComponent } from './pre-requisitos-agendamento-report/pre-requisitos-agendamento-report.component';
import { PanoramaReportService } from './panorama-report/panorama-report.service';
import { AtestadoReportService } from './atestado-report/atestado-report.service';
import { CatReportService } from './cat-report/cat-report.service';
import { PreRequisitosAgendamentoReportService } from './pre-requisitos-agendamento-report/pre-requisitos-agendamento-report.service';
import { ReportsRoutingModule } from './reports.routing.module';
import { SharedModule } from './../controller/shared.module';
import { PipesModule } from './../controller/pipes.module';
import { ModalAvaliacaoHigieneOcupacionalModule } from './../controller/modal-avaliacao-higiene-ocupacional.module';

@NgModule({
    declarations: [
       EmpregadosPorGrupoReportComponent,
       PanoramaReportComponent,
       SolicitacaoCentralIntegraReportComponent,
       AtestadoReportComponent,
       CatReportComponent,
       AvaliacaoHigieneOcupacionalReportComponent,
       PreRequisitosAgendamentoReportComponent
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
        EmpregadosPorGrupoReportService,
        PanoramaReportService,
        AtestadoReportService,
        CatReportService,
        PreRequisitosAgendamentoReportService
     ]
})
export class ReportsModule{}