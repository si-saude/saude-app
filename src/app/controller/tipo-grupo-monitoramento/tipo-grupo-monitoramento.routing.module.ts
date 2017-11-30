import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoGrupoMonitoramentoComponent } from './tipo-grupo-monitoramento.component';
import { TipoGrupoMonitoramentoFormComponent } from './tipo-grupo-monitoramento-form/tipo-grupo-monitoramento-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const tipoGrupoMonitoramentoRoutes: Routes = [
    { path: '', component: TipoGrupoMonitoramentoComponent },
    { path: 'cadastrar', component: TipoGrupoMonitoramentoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: TipoGrupoMonitoramentoFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(tipoGrupoMonitoramentoRoutes)],
    exports: [RouterModule]
})
export class TipoGrupoMonitoramentoRoutingModule {}