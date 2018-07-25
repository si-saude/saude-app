import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtendimentoAvulsoComponent } from './atendimento-avulso.component';
import { AtendimentoAvulsoFormComponent } from './atendimento-avulso-form/atendimento-avulso-form.component';
import { AtendimentoAvulsoFormDetailComponent } from './atendimento-avulso-form/atendimento-avulso-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const atendimentoAvulsoRoutes: Routes = [
    { path: '', component: AtendimentoAvulsoComponent },
    { path: 'cadastrar', component: AtendimentoAvulsoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: AtendimentoAvulsoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: AtendimentoAvulsoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(atendimentoAvulsoRoutes)],
    exports: [RouterModule]
})
export class AtendimentoAvulsoRoutingModule {}