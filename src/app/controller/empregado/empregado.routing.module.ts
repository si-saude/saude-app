import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpregadoComponent } from './empregado.component';
import { EmpregadoFormComponent } from './empregado-form/empregado-form.component';
import { EmpregadoFormDetailComponent } from './empregado-form/empregado-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const empregadoRoutes: Routes = [
    { path: '', component: EmpregadoComponent },
    { path: 'cadastrar', component: EmpregadoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: EmpregadoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: EmpregadoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(empregadoRoutes)],
    exports: [RouterModule]
})
export class EmpregadoRoutingModule {}