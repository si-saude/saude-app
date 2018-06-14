import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoSolicitacaoComponent } from './tipo-solicitacao.component';
import { TipoSolicitacaoFormComponent } from './tipo-solicitacao/tipo-solicitacao-form.component';
import { TipoSolicitacaoFormDetailComponent } from './tipo-solicitacao/tipo-solicitacao-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { TipoSolicitacaoGuard } from './../../guards/guards-child/tipo-solicitacao.guard';

const tipoSolicitacaoRoutes: Routes = [
    { path: '', component: TipoSolicitacaoComponent},
    { path: 'cadastrar', component: TipoSolicitacaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: TipoSolicitacaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: TipoSolicitacaoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(tipoSolicitacaoRoutes)],
    exports: [RouterModule]
})
export class TipoSolicitacaoRoutingModule {}