import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacaoCentralIntegraComponent } from './../../reports/solicitacao-central-integra/solicitacao-central-integra.component'
import { SolicitacaoCentralIntegraFormComponent } from './solicitacao-central-integra-form/solicitacao-central-integra-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const solicitacaoCentralIntegraRoutes: Routes = [
    { path: '', component: SolicitacaoCentralIntegraComponent,
        canDeactivate: [CanDeactivateGuard]},    
    { path: 'editar/:id', component: SolicitacaoCentralIntegraFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(solicitacaoCentralIntegraRoutes)],
    exports: [RouterModule]
})
export class SolicitacaoCentralIntegraRoutingModule {}