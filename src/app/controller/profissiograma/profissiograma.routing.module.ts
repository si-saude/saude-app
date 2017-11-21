import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfissiogramaComponent } from './profissiograma.component';
import { ProfissiogramaFormComponent } from './profissiograma-form/profissiograma-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const profissiogramaRoutes: Routes = [
    { path: '', component: ProfissiogramaComponent },
    { path: 'cadastrar', component: ProfissiogramaFormComponent},
    { path: 'editar/:id', component: ProfissiogramaFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(profissiogramaRoutes)],
    exports: [RouterModule]
})
export class ProfissiogramaRoutingModule {}