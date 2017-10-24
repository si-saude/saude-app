import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorRiscoErgonomicoComponent } from './indicador-risco-ergonomico.component';
import { IndicadorRiscoErgonomicoFormComponent } from './indicador-risco-ergonomico-form/indicador-risco-ergonomico-form.component';
    
const indicadorRiscoErgonomicoRoutes: Routes = [
    { path: 'indicador-risco-ergonomico', component: IndicadorRiscoErgonomicoComponent },
    { path: 'indicador-risco-ergonomico/cadastrar', component: IndicadorRiscoErgonomicoFormComponent},
    { path: 'indicador-risco-ergonomico/editar/:id', component: IndicadorRiscoErgonomicoFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(indicadorRiscoErgonomicoRoutes)],
    exports: [RouterModule]
})
export class IndicadorRiscoErgonomicoRoutingModule {}