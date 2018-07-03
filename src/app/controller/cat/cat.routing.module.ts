import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatComponent } from './cat.component';
import { CatFormComponent } from './cat-form/cat-form.component';
import { CatFormDetailComponent } from './cat-form/cat-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { CatGuard } from './../../guards/guards-child/cat.guard';

const catRoutes: Routes = [
    { path: '', component: CatComponent},
    { path: 'cadastrar', component: CatFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: CatFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: CatFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(catRoutes)],
    exports: [RouterModule]
})
export class CatRoutingModule {}