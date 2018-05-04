import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiscoGheComponent } from './risco-ghe.component';
import { RiscoGheFormComponent } from './risco-ghe-form/risco-ghe-form.component';
import { RiscoGheFormDetailComponent } from './risco-ghe-form/risco-ghe-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { RiscoGheGuard } from './../../guards/guards-child/risco-ghe.guard';

const riscoGheRoutes: Routes = [
    { path: '', component: RiscoGheComponent},
    { path: 'cadastrar', component: RiscoGheFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: RiscoGheFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: RiscoGheFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(riscoGheRoutes)],
    exports: [RouterModule]
})
export class RiscoGheRoutingModule {}