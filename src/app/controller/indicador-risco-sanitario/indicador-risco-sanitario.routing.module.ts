import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorRiscoSanitarioComponent } from './indicador-risco-sanitario.component';
import { IndicadorRiscoSanitarioFormComponent } from './indicador-risco-sanitario-form/indicador-risco-sanitario-form.component';
    
const indicadorRiscoSanitarioRoutes: Routes = [
    { path: 'indicador-risco-sanitario', component: IndicadorRiscoSanitarioComponent },
    { path: 'indicador-risco-sanitario/cadastrar', component: IndicadorRiscoSanitarioFormComponent},
    { path: 'indicador-risco-sanitario/editar/:id', component: IndicadorRiscoSanitarioFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(indicadorRiscoSanitarioRoutes)],
    exports: [RouterModule]
})
export class IndicadorRiscoSanitarioRoutingModule {}