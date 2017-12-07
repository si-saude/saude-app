import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilComponent } from './perfil.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { PerfilFormDetailComponent } from './perfil-form/perfil-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const perfilRoutes: Routes = [
    { path: '', component: PerfilComponent },
    { path: 'cadastrar', component: PerfilFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: PerfilFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: PerfilFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(perfilRoutes)],
    exports: [RouterModule]
})
export class PerfilRoutingModule {}