import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciaComponent } from './gerencia.component';
import { GerenciaFormComponent } from './gerencia-form/gerencia-form.component';
import { GerenciaFormDetailComponent } from './gerencia-form/gerencia-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
  
const gerenciaRoutes: Routes = [
    { path: '', component: GerenciaComponent },
    { path: 'cadastrar', component: GerenciaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: GerenciaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: GerenciaFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(gerenciaRoutes)],
    exports: [RouterModule]
})
export class GerenciaRoutingModule {}