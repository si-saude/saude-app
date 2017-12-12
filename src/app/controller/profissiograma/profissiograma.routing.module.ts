import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfissiogramaComponent } from './profissiograma.component';
import { ProfissiogramaFormComponent } from './profissiograma-form/profissiograma-form.component';
import { ProfissiogramaFormDetailComponent } from './profissiograma-form/profissiograma-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const profissiogramaRoutes: Routes = [
    { path: '', component: ProfissiogramaComponent },
    { path: 'cadastrar', component: ProfissiogramaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: ProfissiogramaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: ProfissiogramaFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(profissiogramaRoutes)],
    exports: [RouterModule]
})
export class ProfissiogramaRoutingModule {}