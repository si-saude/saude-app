import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EixoComponent } from './eixo.component';
import { EixoFormComponent } from './eixo-form/eixo-form.component';
import { EixoFormDetailComponent } from './eixo-form/eixo-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const eixoRoutes: Routes = [
    { path: '', component: EixoComponent },
    { path: 'cadastrar', component: EixoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: EixoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: EixoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(eixoRoutes)],
    exports: [RouterModule]
})
export class EixoRoutingModule {}