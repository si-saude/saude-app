import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorRiscoAcidenteComponent } from './indicador-risco-acidente.component';
import { IndicadorRiscoAcidenteFormComponent } from './indicador-risco-acidente-form/indicador-risco-acidente-form.component';
    
const indicadorRiscoAcidenteRoutes: Routes = [
    { path: 'indicador-risco-acidente', component: IndicadorRiscoAcidenteComponent },
    { path: 'indicador-risco-acidente/cadastrar', component: IndicadorRiscoAcidenteFormComponent},
    { path: 'indicador-risco-acidente/editar/:id', component: IndicadorRiscoAcidenteFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(indicadorRiscoAcidenteRoutes)],
    exports: [RouterModule]
})
export class IndicadorRiscoAcidenteRoutingModule {}