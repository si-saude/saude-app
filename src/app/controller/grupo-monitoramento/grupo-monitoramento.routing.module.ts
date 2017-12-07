import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoMonitoramentoComponent } from './grupo-monitoramento.component';
import { GrupoMonitoramentoFormComponent } from './grupo-monitoramento-form/grupo-monitoramento-form.component';
import { GrupoMonitoramentoFormDetailComponent } from './grupo-monitoramento-form/grupo-monitoramento-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const grupoMonitoramentoRoutes: Routes = [
    { path: '', component: GrupoMonitoramentoComponent },
    { path: 'cadastrar', component: GrupoMonitoramentoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: GrupoMonitoramentoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: GrupoMonitoramentoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(grupoMonitoramentoRoutes)],
    exports: [RouterModule]
})
export class GrupoMonitoramentoRoutingModule {}