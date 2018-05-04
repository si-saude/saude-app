import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpregadosPorGrupoComponent } from './empregados-por-grupo/empregados-por-grupo.component';
import { EmpregadosPorGrupoGuard } from './../guards/guards-child/empregados-por-grupo.guard';

const reportsRoutes: Routes = [
    { path: '', redirectTo: 'empregados-por-grupo', pathMatch: 'full' },
    { path: 'empregados-por-grupo', component: EmpregadosPorGrupoComponent,
        canActivate: [EmpregadosPorGrupoGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(reportsRoutes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule {}