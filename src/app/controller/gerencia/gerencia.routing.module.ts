import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciaComponent } from './gerencia.component';
import { GerenciaFormComponent } from './gerencia-form/gerencia-form.component';
//import { GerenciaCadastrarComponent } from './gerencia-cadastrar/gerencia-cadastrar.component';
//import { GerenciaEditarComponent } from './gerencia-editar/gerencia-editar.component';
    
const gerenciaRoutes: Routes = [
    { path: 'gerencia', component: GerenciaComponent },
    { path: 'gerencia/cadastrar', component: GerenciaFormComponent},
    { path: 'gerencia/editar/:id', component: GerenciaFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(gerenciaRoutes)],
    exports: [RouterModule]
})
export class GerenciaRoutingModule {}