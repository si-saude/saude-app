import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditoriaAsoFormComponent } from './auditoria-aso-form/auditoria-aso-form.component';
import { AuditoriaAsoComponent } from './auditoria-aso.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { AuditoriaAsoGuard } from './../../guards/guards-child/auditoria-aso.guard';

const auditoriaAsoRoutes: Routes = [
    { path: '', component: AuditoriaAsoComponent},
    { path: 'editar/:id', component: AuditoriaAsoFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(auditoriaAsoRoutes)],
    exports: [RouterModule]
})
export class AuditoriaAsoRoutingModule {}