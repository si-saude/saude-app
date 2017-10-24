import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriterioComponent } from './criterio.component';
import { CriterioFormComponent } from './criterio-form/criterio-form.component';
    
const criterioRoutes: Routes = [
    { path: 'criterio', component: CriterioComponent },
    { path: 'criterio/cadastrar', component: CriterioFormComponent },
    { path: 'criterio/editar/:id', component: CriterioFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(criterioRoutes)],
    exports: [RouterModule]
})
export class CriterioRoutingModule {}