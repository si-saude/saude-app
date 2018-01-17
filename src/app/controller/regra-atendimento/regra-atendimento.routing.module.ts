import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegraAtendimentoComponent } from './regra-atendimento.component';
import { RegraAtendimentoFormComponent } from './regra-atendimento-form/regra-atendimento-form.component';
import { RegraAtendimentoFormDetailComponent } from './regra-atendimento-form/regra-atendimento-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const regraAtendimentoRoutes: Routes = [
    { path: '', component: RegraAtendimentoComponent },
    { path: 'cadastrar', component: RegraAtendimentoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: RegraAtendimentoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: RegraAtendimentoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(regraAtendimentoRoutes)],
    exports: [RouterModule]
})
export class RegraAtendimentoRoutingModule {}