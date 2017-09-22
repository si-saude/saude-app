import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilComponent } from './perfil.component';
import { PerfilCadastrarComponent } from './perfil-cadastrar/perfil-cadastrar.component';
import { PerfilEditarComponent } from './perfil-editar/perfil-editar.component';

const perfilRoutes: Routes = [
    { path: 'perfil', component: PerfilComponent },
    { path: 'perfil/cadastrar', component: PerfilCadastrarComponent },
    { path: 'perfil/editar/:id', component: PerfilEditarComponent }
];

@NgModule({
    imports: [RouterModule.forChild(perfilRoutes)],
    exports: [RouterModule]
})
export class PerfilRoutingModule {}