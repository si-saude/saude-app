import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorRiscoAcidenteComponent } from './indicador-risco-acidente.component';
import { IndicadorRiscoAcidenteFormComponent } from './indicador-risco-acidente-form/indicador-risco-acidente-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
 
const indicadorRiscoAcidenteRoutes: Routes = [
    { path: '', component: IndicadorRiscoAcidenteComponent },
    { path: 'cadastrar', component: IndicadorRiscoAcidenteFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: IndicadorRiscoAcidenteFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(indicadorRiscoAcidenteRoutes)],
    exports: [RouterModule]
})
export class IndicadorRiscoAcidenteRoutingModule {}