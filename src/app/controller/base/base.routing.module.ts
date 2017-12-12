import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base.component';
import { BaseFormComponent } from './base-form/base-form.component';
import { BaseFormDetailComponent } from './base-form/base-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { BaseGuard } from './../../guards/guards-child/base.guard';

const baseRoutes: Routes = [
    { path: '', component: BaseComponent},
    { path: 'cadastrar', component: BaseFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: BaseFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: BaseFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(baseRoutes)],
    exports: [RouterModule]
})
export class BaseRoutingModule {}