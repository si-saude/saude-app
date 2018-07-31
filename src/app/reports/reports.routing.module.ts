import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanoramaComponent } from './panorama/panorama.component';
import { SolicitacaoCentralIntegraComponent } from './solicitacao-central-integra/solicitacao-central-integra.component';
import { ReportSolicitacaoCentralIntegraGuard } from './../guards/report-solicitacao-central-integra.guard';
import { PanoramaGuard } from './../guards/panorama.guard';
import { EmpregadosPorGrupoComponent } from './empregados-por-grupo/empregados-por-grupo.component';
import { AtestadoComponent } from './atestado/atestado.component';
import { CatComponent } from './cat/cat.component';
import { PreRequisitosAgendamentoComponent } from './pre-requisitos-agendamento/pre-requisitos-agendamento.component';
import { AvaliacaoHigieneOcupacionalComponent } from './avaliacao-higiene-ocupacional/avaliacao-higiene-ocupacional.component';
import { EmpregadosPorGrupoGuard } from './../guards/guards-child/empregados-por-grupo.guard';
import { ReportAtestadoGuard } from './../guards/report-atestado.guard';
import { ReportCatGuard } from './../guards/report-cat.guard';
import { ReportAvaliacaoHigieneOcupacionalGuard } from './../guards/report-avaliacao-higiene-ocupacional.guard';
import { ReportPreRequisitosAgendamentoGuard } from './../guards/report-pre-requisitos-agendamento.guard';

const reportsRoutes: Routes = [
    { path: '', redirectTo: 'empregados-por-grupo', pathMatch: 'full' },
    { path: 'empregados-por-grupo', component: EmpregadosPorGrupoComponent,
        canActivate: [EmpregadosPorGrupoGuard] },
    { path: 'panorama', component: PanoramaComponent, 
        canActivate: [PanoramaGuard] },
    { path: 'solicitacao-central-integra', component: SolicitacaoCentralIntegraComponent, 
        canActivate: [ReportSolicitacaoCentralIntegraGuard] },
    { path: 'atestado', component: AtestadoComponent, 
        canActivate: [ReportAtestadoGuard] },
    { path: 'cat', component: CatComponent, 
        canActivate: [ReportCatGuard] },
    { path: 'avaliacao-higiene-ocupacional', component: AvaliacaoHigieneOcupacionalComponent, 
        canActivate: [ReportAvaliacaoHigieneOcupacionalGuard] },
    { path: 'pre-requisitos-agendamento', component: PreRequisitosAgendamentoComponent, 
        canActivate: [ReportPreRequisitosAgendamentoGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(reportsRoutes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule {}