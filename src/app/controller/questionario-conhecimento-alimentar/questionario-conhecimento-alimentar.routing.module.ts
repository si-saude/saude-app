import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionarioConhecimentoAlimentarComponent } from './questionario-conhecimento-alimentar.component';
import { QuestionarioConhecimentoAlimentarFormComponent } from './questionario-conhecimento-alimentar-form/questionario-conhecimento-alimentar-form.component';
import { QuestionarioConhecimentoAlimentarFormDetailComponent } from './questionario-conhecimento-alimentar-form/questionario-conhecimento-alimentar-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { QuestionarioConhecimentoAlimentarGuard } from './../../guards/guards-child/questionario-conhecimento-alimentar.guard';

const baseRoutes: Routes = [
    { path: '', component: QuestionarioConhecimentoAlimentarComponent},
    { path: 'cadastrar/:atendimento_id', component: QuestionarioConhecimentoAlimentarFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: QuestionarioConhecimentoAlimentarFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: QuestionarioConhecimentoAlimentarFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(baseRoutes)],
    exports: [RouterModule]
})
export class QuestionarioConhecimentoAlimentarRoutingModule {}