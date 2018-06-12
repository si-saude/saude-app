import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanoramaComponent } from './panorama/panorama.component';
import { SolicitacaoCentralIntegraComponent } from './solicitacao-central-integra/solicitacao-central-integra.component';
import { ReportSolicitacaoCentralIntegraGuard } from './../guards/report-solicitacao-central-integra.guard';
import { PanoramaGuard } from './../guards/panorama.guard';
import { EmpregadosPorGrupoComponent } from './empregados-por-grupo/empregados-por-grupo.component';
import { EmpregadosPorGrupoGuard } from './../guards/guards-child/empregados-por-grupo.guard';

const reportsRoutes: Routes = [
    { path: '', redirectTo: 'empregados-por-grupo', pathMatch: 'full' },
    { path: 'empregados-por-grupo', component: EmpregadosPorGrupoComponent,
        canActivate: [EmpregadosPorGrupoGuard] },
    { path: 'panorama', component: PanoramaComponent, 
        canActivate: [PanoramaGuard] },
    { path: 'solicitacao-central-integra', component: SolicitacaoCentralIntegraComponent, 
        canActivate: [ReportSolicitacaoCentralIntegraGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(reportsRoutes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule {}