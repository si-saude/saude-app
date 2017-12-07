import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioFormDetailComponent } from './usuario-form/usuario-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const usuarioRoutes: Routes = [
    { path: '', component: UsuarioComponent },
    { path: 'cadastrar', component: UsuarioFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: UsuarioFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: UsuarioFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(usuarioRoutes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {}