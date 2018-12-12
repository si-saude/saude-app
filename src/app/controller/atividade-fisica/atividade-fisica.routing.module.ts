import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtividadeFisicaComponent } from './atividade-fisica.component';
import { AtividadeFisicaFormComponent } from './atividade-fisica-form/atividade-fisica-form.component';
import { AtividadeFisicaFormDetailComponent } from './atividade-fisica-form/atividade-fisica-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { AtividadeFisicaGuard } from './../../guards/guards-child/atividade-fisica.guard';

const atividadeFisicaRoutes: Routes = [
    { path: '', component: AtividadeFisicaComponent},
    { path: 'cadastrar', component: AtividadeFisicaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: AtividadeFisicaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: AtividadeFisicaFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(atividadeFisicaRoutes)],
    exports: [RouterModule]
})
export class AtividadeFisicaRoutingModule {}