import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenteRiscoComponent } from './agente-risco.component';
import { AgenteRiscoFormComponent } from './agente-risco-form/agente-risco-form.component';
import { AgenteRiscoFormDetailComponent } from './agente-risco-form/agente-risco-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { AgenteRiscoGuard } from './../../guards/guards-child/agente-risco.guard';

const categoriaAgenteRiscoRoutes: Routes = [
    { path: '', component: AgenteRiscoComponent},
    { path: 'cadastrar', component: AgenteRiscoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: AgenteRiscoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: AgenteRiscoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(categoriaAgenteRiscoRoutes)],
    exports: [RouterModule]
})
export class AgenteRiscoRoutingModule {}