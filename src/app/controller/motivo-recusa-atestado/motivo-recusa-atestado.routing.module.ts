import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotivoRecusaAtestadoComponent } from './motivo-recusa-atestado.component';
import { MotivoRecusaAtestadoFormComponent } from './motivo-recusa-atestado-form/motivo-recusa-atestado-form.component';
import { MotivoRecusaAtestadoFormDetailComponent } from './motivo-recusa-atestado-form/motivo-recusa-atestado-form-detail.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { MotivoRecusaAtestadoGuard } from '../../guards/guards-child/motivo-recusa-atestado.guard';

const motivoRecusaAtestadoRoutes: Routes = [
    { path: '', component: MotivoRecusaAtestadoComponent},
    { path: 'cadastrar', component: MotivoRecusaAtestadoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: MotivoRecusaAtestadoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: MotivoRecusaAtestadoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(motivoRecusaAtestadoRoutes)],
    exports: [RouterModule]
})
export class MotivoRecusaAtestadoRoutingModule {}