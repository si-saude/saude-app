import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoComponent } from './curso.component';
import { CursoFormComponent } from './curso-form/curso-form.component';
    
const cursoRoutes: Routes = [
    { path: 'curso', component: CursoComponent },
    { path: 'curso/cadastrar', component: CursoFormComponent },
    { path: 'curso/editar/:id', component: CursoFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(cursoRoutes)],
    exports: [RouterModule]
})
export class CursoRoutingModule {}