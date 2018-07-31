import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParteCorpoAtingidaComponent } from './parte-corpo-atingida.component';
import { ParteCorpoAtingidaFormComponent } from './parte-corpo-atingida-form/parte-corpo-atingida-form.component';
import { ParteCorpoAtingidaFormDetailComponent } from './parte-corpo-atingida-form/parte-corpo-atingida-form-detail.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { ParteCorpoAtingidaGuard } from '../../guards/guards-child/parte-corpo-atingida.guard';

const parteCorpoAtingidaRoutes: Routes = [
    { path: '', component: ParteCorpoAtingidaComponent},
    { path: 'cadastrar', component: ParteCorpoAtingidaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: ParteCorpoAtingidaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: ParteCorpoAtingidaFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(parteCorpoAtingidaRoutes)],
    exports: [RouterModule]
})
export class ParteCorpoAtingidaRoutingModule {}