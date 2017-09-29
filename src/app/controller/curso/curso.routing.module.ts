import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoComponent } from './curso.component';
import { CursoCadastrarComponent } from './curso-cadastrar/curso-cadastrar.component';
import { CursoEditarComponent } from './curso-editar/curso-editar.component';
    
const cursoRoutes: Routes = [
    { path: 'curso', component: CursoComponent },
    { path: 'curso/cadastrar', component: CursoCadastrarComponent },
    { path: 'curso/editar/:id', component: CursoEditarComponent }
];

@NgModule({
    imports: [RouterModule.forChild(cursoRoutes)],
    exports: [RouterModule]
})
export class CursoRoutingModule {}