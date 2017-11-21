import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GheeComponent } from './ghee.component';
import { GheeFormComponent } from './ghee-form/ghee-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
  
const gheeRoutes: Routes = [
    { path: '', component: GheeComponent },
    { path: 'cadastrar', component: GheeFormComponent },
    { path: 'editar/:id', component: GheeFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(gheeRoutes)],
    exports: [RouterModule]
})
export class GheeRoutingModule {}