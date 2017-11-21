import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeriodicidadeComponent } from './periodicidade.component';
import { PeriodicidadeFormComponent } from './periodicidade-form/periodicidade-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
 
const profissionalSaudeRoutes: Routes = [
    { path: '', component: PeriodicidadeComponent },
    { path: 'cadastrar', component: PeriodicidadeFormComponent},
    { path: 'editar/:id', component: PeriodicidadeFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(profissionalSaudeRoutes)],
    exports: [RouterModule]
})
export class PeriodicidadeRoutingModule {}