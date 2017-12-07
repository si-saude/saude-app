import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioMedicoComponent } from './relatorio-medico.component';
import { RelatorioMedicoFormComponent } from './relatorio-medico-form/relatorio-medico-form.component';
import { RelatorioMedicoFormDetailComponent } from './relatorio-medico-form/relatorio-medico-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const relatorioMedicoRoutes: Routes = [
    { path: '', component: RelatorioMedicoComponent },
    { path: 'cadastrar', component: RelatorioMedicoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: RelatorioMedicoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: RelatorioMedicoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(relatorioMedicoRoutes)],
    exports: [RouterModule]
})
export class RelatorioMedicoRoutingModule {}