import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoMonitoramentoComponent } from './grupo-monitoramento.component';
import { GrupoMonitoramentoFormComponent } from './grupo-monitoramento-form/grupo-monitoramento-form.component';
    
const grupoMonitoramentoRoutes: Routes = [
    { path: 'grupo-monitoramento', component: GrupoMonitoramentoComponent },
    { path: 'grupo-monitoramento/cadastrar', component: GrupoMonitoramentoFormComponent},
    { path: 'grupo-monitoramento/editar/:id', component: GrupoMonitoramentoFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(grupoMonitoramentoRoutes)],
    exports: [RouterModule]
})
export class GrupoMonitoramentoRoutingModule {}