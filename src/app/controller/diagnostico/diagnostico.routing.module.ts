import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagnosticoComponent } from './diagnostico.component';
import { DiagnosticoFormComponent } from './diagnostico-form/diagnostico-form.component';
import { DiagnosticoFormDetailComponent } from './diagnostico-form/diagnostico-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const diagnosticoRoutes: Routes = [
    { path: '', component: DiagnosticoComponent },
    { path: 'cadastrar', component: DiagnosticoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: DiagnosticoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: DiagnosticoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(diagnosticoRoutes)],
    exports: [RouterModule]
})
export class DiagnosticoRoutingModule {}