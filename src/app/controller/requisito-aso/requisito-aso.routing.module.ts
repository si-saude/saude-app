import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequisitoAsoComponent } from './requisito-aso.component';
import { RequisitoAsoFormComponent } from './requisito-aso-form/requisito-aso-form.component';
import { RequisitoAsoFormDetailComponent } from './requisito-aso-form/requisito-aso-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const requisitoRoutes: Routes = [
    { path: '', component: RequisitoAsoComponent },
    { path: 'cadastrar', component: RequisitoAsoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: RequisitoAsoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: RequisitoAsoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(requisitoRoutes)],
    exports: [RouterModule]
})
export class RequisitoAsoRoutingModule {}