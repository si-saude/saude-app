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
import { ControleAtestadoReportComponent } from './controle-atestado-report/controle-atestado-report.component';
import { CatReportComponent } from './cat-report/cat-report.component';
import { AvaliacaoHigieneOcupacionalReportComponent } from './avaliacao-higiene-ocupacional-report/avaliacao-higiene-ocupacional-report.component';
import { PreRequisitosAgendamentoReportComponent } from './pre-requisitos-agendamento-report/pre-requisitos-agendamento-report.component';
import { MudancaFuncaoReportComponent } from './mudanca-funcao-report/mudanca-funcao-report.component';
import { AcompanhamentoSastReportComponent } from './acompanhamento-sast-report/acompanhamento-sast-report.component';
import { SugestaoAgendamentoReportComponent } from './sugestao-agendamento-report/sugestao-agendamento-report.component';
import { ConformidadeAsoReportComponent } from './conformidade-aso-report/conformidade-aso-report.component';
import { ExamesImportadosReportComponent } from './exames-importados-report/exames-importados-report.component';
import { PanoramaReportService } from './panorama-report/panorama-report.service';
import { ControleAtestadoReportService } from './controle-atestado-report/controle-atestado-report.service';
import { CatReportService } from './cat-report/cat-report.service';
import { ConformidadeAsoReportService } from './conformidade-aso-report/conformidade-aso-report.service';
import { SugestaoAgendamentoReportService } from './sugestao-agendamento-report/sugestao-agendamento-report.service';
import { PreRequisitosAgendamentoReportService } from './pre-requisitos-agendamento-report/pre-requisitos-agendamento-report.service';
import { MudancaFuncaoReportService } from './mudanca-funcao-report/mudanca-funcao-report.service';
import { AcompanhamentoSastReportService } from './acompanhamento-sast-report/acompanhamento-sast-report.service';
import { ExamesImportadosReportService } from './exames-importados-report/exames-importados-report.service';
import { ReportsRoutingModule } from './reports.routing.module';
import { SharedModule } from './../controller/shared.module';
import { PipesModule } from './../controller/pipes.module';
import { ModalAvaliacaoHigieneOcupacionalModule } from './../controller/modal-avaliacao-higiene-ocupacional.module';
import { ModalDisplayTextModule } from './../includes/modal-display-text/modal-display-text.module';
import { CalendarComponent } from "angular2-fullcalendar/src/calendar/calendar";

@NgModule({
    declarations: [
       EmpregadosPorGrupoReportComponent,
       PanoramaReportComponent,
       SolicitacaoCentralIntegraReportComponent,
       ControleAtestadoReportComponent,
       CatReportComponent,
       AvaliacaoHigieneOcupacionalReportComponent,
       PreRequisitosAgendamentoReportComponent,
       MudancaFuncaoReportComponent,
       AcompanhamentoSastReportComponent,
       SugestaoAgendamentoReportComponent,
       CalendarComponent,
       ConformidadeAsoReportComponent,
       ExamesImportadosReportComponent
     ],
     imports: [
        ReportsRoutingModule,
        DataTableModule,
        SharedModule,
        MyDatePickerModule,
        MaterializeModule,
        PipesModule,
        ModalAvaliacaoHigieneOcupacionalModule,
        ModalDisplayTextModule 
     ],
     providers: [
        EmpregadosPorGrupoReportService,
        PanoramaReportService,
        ControleAtestadoReportService,
        CatReportService,
        PreRequisitosAgendamentoReportService,
        MudancaFuncaoReportService,
        AcompanhamentoSastReportService,
        SugestaoAgendamentoReportService,
        ConformidadeAsoReportService,
        ExamesImportadosReportService
     ]
})
export class ReportsModule{}