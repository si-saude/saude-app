import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilComponent } from './perfil.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const perfilRoutes: Routes = [
    { path: '', component: PerfilComponent },
    { path: 'cadastrar', component: PerfilFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: PerfilFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(perfilRoutes)],
    exports: [RouterModule]
})
export class PerfilRoutingModule {}