import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicoComponent } from './servico.component';
import { ServicoFormComponent } from './servico-form/servico-form.component';
import { ServicoFormDetailComponent } from './servico-form/servico-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const servicoRoutes: Routes = [
    { path: '', component: ServicoComponent },
    { path: 'cadastrar', component: ServicoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: ServicoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: ServicoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(servicoRoutes)],
    exports: [RouterModule]
})
export class ServicoRoutingModule {}