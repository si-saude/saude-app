import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtendimentoFormComponent } from './atendimento-form/atendimento-form.component';
import { AtendimentoComponent } from './atendimento.component';

const atendimentoRoutes: Routes = [
    { path: '', component: AtendimentoFormComponent },
    { path: 'gerenciar', component: AtendimentoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(atendimentoRoutes)],
    exports: [RouterModule]
})
export class AtendimentoRoutingModule {}