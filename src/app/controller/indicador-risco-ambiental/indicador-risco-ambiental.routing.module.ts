import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorRiscoAmbientalComponent } from './indicador-risco-ambiental.component';
import { IndicadorRiscoAmbientalFormComponent } from './indicador-risco-ambiental-form/indicador-risco-ambiental-form.component';
import { IndicadorRiscoAmbientalFormDetailComponent } from './indicador-risco-ambiental-form/indicador-risco-ambiental-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const indicadorRiscoAmbientalRoutes: Routes = [
    { path: '', component: IndicadorRiscoAmbientalComponent },
    { path: 'cadastrar', component: IndicadorRiscoAmbientalFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: IndicadorRiscoAmbientalFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: IndicadorRiscoAmbientalFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(indicadorRiscoAmbientalRoutes)],
    exports: [RouterModule]
})
export class IndicadorRiscoAmbientalRoutingModule {}