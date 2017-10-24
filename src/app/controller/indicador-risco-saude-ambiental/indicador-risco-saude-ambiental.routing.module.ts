import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorRiscoSaudeAmbientalComponent } from './indicador-risco-saude-ambiental.component';
import { IndicadorRiscoSaudeAmbientalFormComponent } from './indicador-risco-saude-ambiental-form/indicador-risco-saude-ambiental-form.component';
    
const indicadorRiscoSaudeAmbientalRoutes: Routes = [
    { path: 'indicador-risco-saude-ambiental', component: IndicadorRiscoSaudeAmbientalComponent },
    { path: 'indicador-risco-saude-ambiental/cadastrar', component: IndicadorRiscoSaudeAmbientalFormComponent},
    { path: 'indicador-risco-saude-ambiental/editar/:id', component: IndicadorRiscoSaudeAmbientalFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(indicadorRiscoSaudeAmbientalRoutes)],
    exports: [RouterModule]
})
export class IndicadorRiscoSaudeAmbientalRoutingModule {}