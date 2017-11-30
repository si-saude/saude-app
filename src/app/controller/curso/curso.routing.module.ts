import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoComponent } from './curso.component';
import { CursoFormComponent } from './curso-form/curso-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const cursoRoutes: Routes = [
    { path: '', component: CursoComponent },
    { path: 'cadastrar', component: CursoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: CursoFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(cursoRoutes)],
    exports: [RouterModule]
})
export class CursoRoutingModule {}