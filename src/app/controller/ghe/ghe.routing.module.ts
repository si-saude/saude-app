import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GheComponent } from './ghe.component';
import { GheFormComponent } from './ghe-form/ghe-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const gheRoutes: Routes = [
    { path: '', component: GheComponent },
    { path: 'cadastrar', component: GheFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: GheFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(gheRoutes)],
    exports: [RouterModule]
})
export class GheRoutingModule {}