import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfissionalSaudeComponent } from './profissional-saude.component';
import { ProfissionalSaudeFormComponent } from './profissional-saude-form/profissional-saude-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const profissionalSaudeRoutes: Routes = [
    { path: '', component: ProfissionalSaudeComponent },
    { path: 'cadastrar', component: ProfissionalSaudeFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: ProfissionalSaudeFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(profissionalSaudeRoutes)],
    exports: [RouterModule]
})
export class ProfissionalSaudeRoutingModule {}