import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base.component';
import { BaseFormComponent } from './base-form/base-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
    
const baseRoutes: Routes = [
    { path: '', component: BaseComponent},
    { path: 'cadastrar', component: BaseFormComponent },
    { path: 'editar/:id', component: BaseFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(baseRoutes)],
    exports: [RouterModule]
})
export class BaseRoutingModule {}