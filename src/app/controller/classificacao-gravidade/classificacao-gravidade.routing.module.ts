import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassificacaoGravidadeComponent } from './classificacao-gravidade.component';
import { ClassificacaoGravidadeFormComponent } from './classificacao-gravidade-form/classificacao-gravidade-form.component';
import { ClassificacaoGravidadeFormDetailComponent } from './classificacao-gravidade-form/classificacao-gravidade-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const classificacaoGravidadeRoutes: Routes = [
    { path: '', component: ClassificacaoGravidadeComponent },
    { path: 'cadastrar', component: ClassificacaoGravidadeFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: ClassificacaoGravidadeFormComponent,
        canDeactivate: [CanDeactivateGuard] },
    { path: 'detalhe/:id', component: ClassificacaoGravidadeFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(classificacaoGravidadeRoutes)],
    exports: [RouterModule]
})
export class ClassificacaoGravidadeRoutingModule {}