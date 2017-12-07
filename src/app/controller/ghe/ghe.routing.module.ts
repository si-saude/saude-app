import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GheComponent } from './ghe.component';
import { GheFormComponent } from './ghe-form/ghe-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { GheFormDetailComponent } from './ghe-form/ghe-form-detail.component';

const gheRoutes: Routes = [
    { path: '', component: GheComponent },
    { path: 'cadastrar', component: GheFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: GheFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: GheFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(gheRoutes)],
    exports: [RouterModule]
})
export class GheRoutingModule {}