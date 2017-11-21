import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegimeComponent } from './regime.component';
import { RegimeFormComponent } from './regime-form/regime-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const regimeRoutes: Routes = [
    { path: '', component: RegimeComponent },
    { path: 'cadastrar', component: RegimeFormComponent },
    { path: 'editar/:id', component: RegimeFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(regimeRoutes)],
    exports: [RouterModule]
})
export class RegimeRoutingModule {}