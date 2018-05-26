import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprhoComponent } from './aprho.component';
import { AprhoFormComponent } from './aprho-form/aprho-form.component';
import { AprhoFormDetailComponent } from './aprho-form/aprho-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { AprhoGuard } from './../../guards/guards-child/aprho.guard';

const aprhoRoutes: Routes = [
    { path: '', component: AprhoComponent},
    { path: 'cadastrar', component: AprhoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: AprhoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: AprhoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(aprhoRoutes)],
    exports: [RouterModule]
})
export class AprhoRoutingModule {}