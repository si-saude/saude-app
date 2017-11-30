import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorRiscoSaudeAmbientalComponent } from './indicador-risco-saude-ambiental.component';
import { IndicadorRiscoSaudeAmbientalFormComponent } from './indicador-risco-saude-ambiental-form/indicador-risco-saude-ambiental-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const indicadorRiscoSaudeAmbientalRoutes: Routes = [
    { path: '', component: IndicadorRiscoSaudeAmbientalComponent },
    { path: 'cadastrar', component: IndicadorRiscoSaudeAmbientalFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: IndicadorRiscoSaudeAmbientalFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(indicadorRiscoSaudeAmbientalRoutes)],
    exports: [RouterModule]
})
export class IndicadorRiscoSaudeAmbientalRoutingModule {}