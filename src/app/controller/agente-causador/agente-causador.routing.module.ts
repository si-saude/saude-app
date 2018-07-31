import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenteCausadorComponent } from './agente-causador.component';
import { AgenteCausadorFormComponent } from './agente-causador-form/agente-causador-form.component';
import { AgenteCausadorFormDetailComponent } from './agente-causador-form/agente-causador-form-detail.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { AgenteCausadorGuard } from '../../guards/guards-child/agente-causador.guard';

const agenteCausadorRoutes: Routes = [
    { path: '', component: AgenteCausadorComponent},
    { path: 'cadastrar', component: AgenteCausadorFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: AgenteCausadorFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: AgenteCausadorFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(agenteCausadorRoutes)],
    exports: [RouterModule]
})
export class AgenteCausadorRoutingModule {}