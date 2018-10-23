import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutricaoAlimentoComponent } from '../nutricao-alimento/nutricao-alimento.component';
import { NutricaoAlimentoFormComponent } from '../nutricao-alimento/nutricao-alimento-form/nutricao-alimento-form.component';
import { NutricaoAlimentoFormDetailComponent } from '../nutricao-alimento/nutricao-alimento-form/nutricao-alimento-form-detail.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { NutricaoAlimentoGuard } from '../../guards/guards-child/nutricao-alimento.guard';

const nutricaoAlimentoRoutes: Routes = [
    { path: '', component: NutricaoAlimentoComponent},
    { path: 'cadastrar', component: NutricaoAlimentoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: NutricaoAlimentoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: NutricaoAlimentoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(nutricaoAlimentoRoutes)],
    exports: [RouterModule]
})
export class NutricaoAlimentoRoutingModule {}