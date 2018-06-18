import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FonteGeradoraComponent } from './fonte-geradora.component';
import { FonteGeradoraFormComponent } from './fonte-geradora-form/fonte-geradora-form.component';
import { FonteGeradoraFormDetailComponent } from './fonte-geradora-form/fonte-geradora-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const fontegeradoraRoutes: Routes = [
    { path: '', component: FonteGeradoraComponent},
    { path: 'cadastrar', component: FonteGeradoraFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: FonteGeradoraFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: FonteGeradoraFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(fontegeradoraRoutes)],
    exports: [RouterModule]
})
export class FonteGeradoraRoutingModule {}