import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicaComponent } from '../clinica/clinica.component';
import { ClinicaFormComponent } from '../clinica/clinica-form/clinica-form.component';
import { ClinicaFormDetailComponent } from '../clinica/clinica-form/clinica-form-detail.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { ClinicaGuard } from '../../guards/guards-child/clinica.guard';

const clinicaRoutes: Routes = [
    { path: '', component: ClinicaComponent},
    { path: 'cadastrar', component: ClinicaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: ClinicaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: ClinicaFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(clinicaRoutes)],
    exports: [RouterModule]
})
export class ClinicaRoutingModule {}