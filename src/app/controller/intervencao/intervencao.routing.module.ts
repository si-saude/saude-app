import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntervencaoComponent } from './intervencao.component';
import { IntervencaoFormComponent } from './intervencao-form/intervencao-form.component';
import { IntervencaoFormDetailComponent } from './intervencao-form/intervencao-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
 
const intervencaoRoutes: Routes = [
    { path: '', component: IntervencaoComponent },
    { path: 'cadastrar', component: IntervencaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: IntervencaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: IntervencaoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(intervencaoRoutes)],
    exports: [RouterModule]
})
export class IntervencaoRoutingModule {}