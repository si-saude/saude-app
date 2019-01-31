import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanoAlimentarComponent } from './plano-alimentar.component';
import { PlanoAlimentarFormComponent } from './plano-alimentar-form/plano-alimentar-form.component';
import { PlanoAlimentarFormDetailComponent } from './plano-alimentar-form/plano-alimentar-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { PlanoAlimentarGuard } from './../../guards/guards-child/plano-alimentar.guard';

const planoAlimentarRoutes: Routes = [
    { path: '', component: PlanoAlimentarComponent},
    { path: 'cadastrar/:atendimento_id/:empregado', component: PlanoAlimentarFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id/:empregado', component: PlanoAlimentarFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id/:empregado', component: PlanoAlimentarFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(planoAlimentarRoutes)],
    exports: [RouterModule]
})
export class PlanoAlimentarRoutingModule {}