import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CidadeComponent } from './cidade.component';
import { CidadeFormComponent } from './cidade-form/cidade-form.component';
//import { CidadeCadastrarComponent } from './cidade-cadastrar/cidade-cadastrar.component';
//import { CidadeEditarComponent } from './cidade-editar/cidade-editar.component';
    
const cidadeRoutes: Routes = [
    { path: 'cidade', component: CidadeComponent },
    { path: 'cidade/cadastrar', component: CidadeFormComponent },
    { path: 'cidade/editar/:id', component: CidadeFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(cidadeRoutes)],
    exports: [RouterModule]
})
export class CidadeRoutingModule {}