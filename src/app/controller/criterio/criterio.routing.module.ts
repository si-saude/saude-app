import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriterioComponent } from './criterio.component';
import { CriterioFormComponent } from './criterio-form/criterio-form.component';
import { CriterioFormDetailComponent } from './criterio-form/criterio-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
  
const criterioRoutes: Routes = [
    { path: '', component: CriterioComponent },
    { path: 'cadastrar', component: CriterioFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: CriterioFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: CriterioFormDetailComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(criterioRoutes)],
    exports: [RouterModule]
})
export class CriterioRoutingModule {}