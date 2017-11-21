import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorRiscoErgonomicoComponent } from './indicador-risco-ergonomico.component';
import { IndicadorRiscoErgonomicoFormComponent } from './indicador-risco-ergonomico-form/indicador-risco-ergonomico-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const indicadorRiscoErgonomicoRoutes: Routes = [
    { path: '', component: IndicadorRiscoErgonomicoComponent },
    { path: 'cadastrar', component: IndicadorRiscoErgonomicoFormComponent},
    { path: 'editar/:id', component: IndicadorRiscoErgonomicoFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(indicadorRiscoErgonomicoRoutes)],
    exports: [RouterModule]
})
export class IndicadorRiscoErgonomicoRoutingModule {}