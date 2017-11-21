import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciaComponent } from './gerencia.component';
import { GerenciaFormComponent } from './gerencia-form/gerencia-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
  
const gerenciaRoutes: Routes = [
    { path: '', component: GerenciaComponent },
    { path: 'cadastrar', component: GerenciaFormComponent},
    { path: 'editar/:id', component: GerenciaFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(gerenciaRoutes)],
    exports: [RouterModule]
})
export class GerenciaRoutingModule {}