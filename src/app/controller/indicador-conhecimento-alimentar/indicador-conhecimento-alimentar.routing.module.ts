import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadorConhecimentoAlimentarComponent } from './indicador-conhecimento-alimentar.component';
import { IndicadorConhecimentoAlimentarFormComponent } from './indicador-conhecimento-alimentar-form/indicador-conhecimento-alimentar-form.component';
import { IndicadorConhecimentoAlimentarFormDetailComponent } from './indicador-conhecimento-alimentar-form/indicador-conhecimento-alimentar-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { IndicadorConhecimentoAlimentarGuard } from './../../guards/guards-child/indicador-conhecimento-alimentar.guard';

const indicadorConhecimentoAlimentarRoutes: Routes = [
    { path: '', component: IndicadorConhecimentoAlimentarComponent},
    { path: 'cadastrar', component: IndicadorConhecimentoAlimentarFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: IndicadorConhecimentoAlimentarFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: IndicadorConhecimentoAlimentarFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(indicadorConhecimentoAlimentarRoutes)],
    exports: [RouterModule]
})
export class IndicadorConhecimentoAlimentarRoutingModule {}