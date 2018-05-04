import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorSastComponent } from './indicador-sast.component';
import { IndicadorSastFormComponent } from './indicador-sast-form/indicador-sast-form.component';
import { IndicadorSastFormDetailComponent } from './indicador-sast-form/indicador-sast-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
 
const indicadorSastRoutes: Routes = [
    { path: '', component: IndicadorSastComponent },
    { path: 'cadastrar', component: IndicadorSastFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: IndicadorSastFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: IndicadorSastFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(indicadorSastRoutes)],
    exports: [RouterModule]
})
export class IndicadorSastRoutingModule {}