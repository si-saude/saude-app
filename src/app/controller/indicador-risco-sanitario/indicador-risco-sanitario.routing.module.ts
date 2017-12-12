import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorRiscoSanitarioComponent } from './indicador-risco-sanitario.component';
import { IndicadorRiscoSanitarioFormComponent } from './indicador-risco-sanitario-form/indicador-risco-sanitario-form.component';
import { IndicadorRiscoSanitarioFormDetailComponent } from './indicador-risco-sanitario-form/indicador-risco-sanitario-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const indicadorRiscoSanitarioRoutes: Routes = [
    { path: '', component: IndicadorRiscoSanitarioComponent },
    { path: 'cadastrar', component: IndicadorRiscoSanitarioFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: IndicadorRiscoSanitarioFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: IndicadorRiscoSanitarioFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(indicadorRiscoSanitarioRoutes)],
    exports: [RouterModule]
})
export class IndicadorRiscoSanitarioRoutingModule {}