import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorRiscoAmbientalComponent } from './indicador-risco-ambiental.component';
import { IndicadorRiscoAmbientalFormComponent } from './indicador-risco-ambiental-form/indicador-risco-ambiental-form.component';
    
const indicadorRiscoAmbientalRoutes: Routes = [
    { path: 'indicador-risco-ambiental', component: IndicadorRiscoAmbientalComponent },
    { path: 'indicador-risco-ambiental/cadastrar', component: IndicadorRiscoAmbientalFormComponent},
    { path: 'indicador-risco-ambiental/editar/:id', component: IndicadorRiscoAmbientalFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(indicadorRiscoAmbientalRoutes)],
    exports: [RouterModule]
})
export class IndicadorRiscoAmbientalRoutingModule {}