import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilComponent } from './perfil.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
//import { PerfilCadastrarComponent } from './perfil-cadastrar/perfil-cadastrar.component';
//import { PerfilEditarComponent } from './perfil-editar/perfil-editar.component';

const perfilRoutes: Routes = [
    { path: 'perfil', component: PerfilComponent },
    { path: 'perfil/cadastrar', component: PerfilFormComponent },
    { path: 'perfil/editar/:id', component: PerfilFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(perfilRoutes)],
    exports: [RouterModule]
})
export class PerfilRoutingModule {}