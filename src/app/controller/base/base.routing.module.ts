import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base.component';
import { BaseFormComponent } from './base-form/base-form.component';
    
const baseRoutes: Routes = [
    { path: 'base', component: BaseComponent },
    { path: 'base/cadastrar', component: BaseFormComponent },
    { path: 'base/editar/:id', component: BaseFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(baseRoutes)],
    exports: [RouterModule]
})
export class BaseRoutingModule {}