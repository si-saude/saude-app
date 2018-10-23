import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanoramaReportComponent } from './panorama-report/panorama-report.component';
import { SolicitacaoCentralIntegraReportComponent } from './solicitacao-central-integra-report/solicitacao-central-integra-report.component';
import { EmpregadosPorGrupoReportComponent } from './empregados-por-grupo-report/empregados-por-grupo-report.component';
import { ControleAtestadoReportComponent } from './controle-atestado-report/controle-atestado-report.component';
import { CatReportComponent } from './cat-report/cat-report.component';
import { PreRequisitosAgendamentoReportComponent } from './pre-requisitos-agendamento-report/pre-requisitos-agendamento-report.component';
import { AvaliacaoHigieneOcupacionalReportComponent } from './avaliacao-higiene-ocupacional-report/avaliacao-higiene-ocupacional-report.component';
import { MudancaFuncaoReportComponent } from './mudanca-funcao-report/mudanca-funcao-report.component';
import { AcompanhamentoSastReportComponent } from './acompanhamento-sast-report/acompanhamento-sast-report.component';
import { ReportSolicitacaoCentralIntegraGuard } from './../guards/report-solicitacao-central-integra.guard';
import { PanoramaGuard } from './../guards/panorama.guard';
import { EmpregadosPorGrupoGuard } from './../guards/guards-child/empregados-por-grupo.guard';
import { ReportControleAtestadoGuard } from './../guards/report-controle-atestado.guard';
import { ReportCatGuard } from './../guards/report-cat.guard';
import { ReportAvaliacaoHigieneOcupacionalGuard } from './../guards/report-avaliacao-higiene-ocupacional.guard';
import { ReportPreRequisitosAgendamentoGuard } from './../guards/report-pre-requisitos-agendamento.guard';
import { ReportMudancaFuncaoGuard } from './../guards/report-mudanca-funcao.guard';
import { ReportAcompanhamentoSastGuard } from './../guards/report-acompanhamento-sast.guard';

const reportsRoutes: Routes = [
    { path: '', redirectTo: 'empregados-por-grupo', pathMatch: 'full' },
    { path: 'empregados-por-grupo', component: EmpregadosPorGrupoReportComponent,
        canActivate: [EmpregadosPorGrupoGuard] },
    { path: 'panorama', component: PanoramaReportComponent, 
        canActivate: [PanoramaGuard] },
    { path: 'solicitacao-central-integra', component: SolicitacaoCentralIntegraReportComponent, 
        canActivate: [ReportSolicitacaoCentralIntegraGuard] },
    { path: 'atestado', component: ControleAtestadoReportComponent, 
        canActivate: [ReportControleAtestadoGuard] },
    { path: 'cat', component: CatReportComponent, 
        canActivate: [ReportCatGuard] },
    { path: 'avaliacao-higiene-ocupacional', component: AvaliacaoHigieneOcupacionalReportComponent, 
        canActivate: [ReportAvaliacaoHigieneOcupacionalGuard] },
    { path: 'pre-requisitos-agendamento', component: PreRequisitosAgendamentoReportComponent, 
        canActivate: [ReportPreRequisitosAgendamentoGuard] },
    { path: 'mudanca-funcao', component: MudancaFuncaoReportComponent, 
        canActivate: [ReportMudancaFuncaoGuard] },
    { path: 'acompanhamento-sast', component: AcompanhamentoSastReportComponent, 
        canActivate: [ReportAcompanhamentoSastGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(reportsRoutes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule {}