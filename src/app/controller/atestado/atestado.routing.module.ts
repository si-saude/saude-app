import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtestadoComponent } from '../atestado/atestado.component';
import { AtestadoFormComponent } from '../atestado/atestado-form/atestado-form.component';
import { AtestadoFormDetailComponent } from '../atestado/atestado-form/atestado-form-detail.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { AtestadoGuard } from '../../guards/guards-child/atestado.guard';

const atestadoRoutes: Routes = [
    { path: '', component: AtestadoComponent},
    { path: 'cadastrar', component: AtestadoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: AtestadoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: AtestadoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(atestadoRoutes)],
    exports: [RouterModule]
})
export class AtestadoRoutingModule {}