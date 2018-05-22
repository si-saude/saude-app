import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaRiscoComponent } from './categoria-risco.component';
import { CategoriaRiscoFormComponent } from './categoria-risco-form/categoria-risco-form.component';
import { CategoriaRiscoFormDetailComponent } from './categoria-risco-form/categoria-risco-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { CategoriaRiscoGuard } from './../../guards/guards-child/categoria-risco.guard';

const categoriaRiscoRoutes: Routes = [
    { path: '', component: CategoriaRiscoComponent},
    { path: 'cadastrar', component: CategoriaRiscoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: CategoriaRiscoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: CategoriaRiscoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(categoriaRiscoRoutes)],
    exports: [RouterModule]
})
export class CategoriaRiscoRoutingModule {}