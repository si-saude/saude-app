import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnfaseComponent } from './enfase.component';
import { EnfaseFormComponent } from './enfase-form/enfase-form.component';
import { EnfaseFormDetailComponent } from './enfase-form/enfase-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { EnfaseGuard } from './../../guards/guards-child/enfase.guard';

const enfaseRoutes: Routes = [
    { path: '', component: EnfaseComponent},
    { path: 'cadastrar', component: EnfaseFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: EnfaseFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: EnfaseFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(enfaseRoutes)],
    exports: [RouterModule]
})
export class EnfaseRoutingModule {}