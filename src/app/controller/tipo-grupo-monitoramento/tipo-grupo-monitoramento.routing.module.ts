import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoGrupoMonitoramentoComponent } from './tipo-grupo-monitoramento.component';
import { TipoGrupoMonitoramentoFormComponent } from './tipo-grupo-monitoramento-form/tipo-grupo-monitoramento-form.component';
    
const tipoGrupoMonitoramentoRoutes: Routes = [
    { path: 'tipo-grupo-monitoramento', component: TipoGrupoMonitoramentoComponent },
    { path: 'tipo-grupo-monitoramento/cadastrar', component: TipoGrupoMonitoramentoFormComponent },
    { path: 'tipo-grupo-monitoramento/editar/:id', component: TipoGrupoMonitoramentoFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(tipoGrupoMonitoramentoRoutes)],
    exports: [RouterModule]
})
export class TipoGrupoMonitoramentoRoutingModule {}