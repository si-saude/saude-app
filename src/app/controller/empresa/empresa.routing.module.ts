import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresaComponent } from '../empresa/empresa.component';
import { EmpresaFormComponent } from '../empresa/empresa-form/empresa-form.component';
import { EmpresaFormDetailComponent } from '../empresa/empresa-form/empresa-form-detail.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { EmpresaGuard } from '../../guards/guards-child/empresa.guard';

const empresaRoutes: Routes = [
    { path: '', component: EmpresaComponent},
    { path: 'cadastrar', component: EmpresaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: EmpresaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: EmpresaFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(empresaRoutes)],
    exports: [RouterModule]
})
export class EmpresaRoutingModule {}