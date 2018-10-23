import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedidaAlimentarComponent } from '../medida-alimentar/medida-alimentar.component';
import { MedidaAlimentarFormComponent } from '../medida-alimentar/medida-alimentar-form/medida-alimentar-form.component';
import { MedidaAlimentarFormDetailComponent } from '../medida-alimentar/medida-alimentar-form/medida-alimentar-form-detail.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { MedidaAlimentarGuard } from '../../guards/guards-child/medida-alimentar.guard';

const medidaAlimentarRoutes: Routes = [
    { path: '', component: MedidaAlimentarComponent},
    { path: 'cadastrar', component: MedidaAlimentarFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: MedidaAlimentarFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: MedidaAlimentarFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(medidaAlimentarRoutes)],
    exports: [RouterModule]
})
export class MedidaAlimentarRoutingModule {}