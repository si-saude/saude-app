import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KanbanComponent } from './../../kanban/kanban.component';
import { SolicitacaoCentralIntegraComponent } from './../../reports/solicitacao-central-integra/solicitacao-central-integra.component'
import { SolicitacaoCentralIntegraFormComponent } from './solicitacao-central-integra-form/solicitacao-central-integra-form.component';
import { SolicitacaoCentralIntegraFormObservacaoComponent } from './solicitacao-central-integra-form/solicitacao-central-integra-form-observacao.component';
import { SolicitacaoCentralIntegraFormDescricaoComponent } from './solicitacao-central-integra-form/solicitacao-central-integra-form-descricao.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const solicitacaoCentralIntegraRoutes: Routes = [
    { path: '', component: KanbanComponent,
        canDeactivate: [CanDeactivateGuard]},    
    { path: 'editar/:id', component: SolicitacaoCentralIntegraFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'observacao/:id', component: SolicitacaoCentralIntegraFormObservacaoComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'descricao/:id', component: SolicitacaoCentralIntegraFormDescricaoComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(solicitacaoCentralIntegraRoutes)],
    exports: [RouterModule]
})
export class SolicitacaoCentralIntegraRoutingModule {}