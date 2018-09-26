import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassificacaoAfastamentoComponent } from './classificacao-afastamento.component';
import { ClassificacaoAfastamentoFormComponent } from './classificacao-afastamento-form/classificacao-afastamento-form.component';
import { ClassificacaoAfastamentoFormDetailComponent } from './classificacao-afastamento-form/classificacao-afastamento-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const classificacaoAfastamentoRoutes: Routes = [
    { path: '', component: ClassificacaoAfastamentoComponent },
    { path: 'cadastrar', component: ClassificacaoAfastamentoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: ClassificacaoAfastamentoFormComponent,
        canDeactivate: [CanDeactivateGuard] },
    { path: 'detalhe/:id', component: ClassificacaoAfastamentoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(classificacaoAfastamentoRoutes)],
    exports: [RouterModule]
})
export class ClassificacaoAfastamentoRoutingModule {}