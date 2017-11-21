import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipeComponent } from './equipe.component';
import { EquipeFormComponent } from './equipe-form/equipe-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const equipeRoutes: Routes = [
    { path: '', component: EquipeComponent },
    { path: 'cadastrar', component: EquipeFormComponent },
    { path: 'editar/:id', component: EquipeFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(equipeRoutes)],
    exports: [RouterModule]
})
export class EquipeRoutingModule {}