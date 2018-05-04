import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerguntaFichaColetaComponent } from './pergunta-ficha-coleta.component';
import { PerguntaFichaColetaFormComponent } from './pergunta-ficha-coleta-form/pergunta-ficha-coleta-form.component';
import { PerguntaFichaColetaFormDetailComponent } from './pergunta-ficha-coleta-form/pergunta-ficha-coleta-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const perguntaFichaColetaRoutes: Routes = [
    { path: '', component: PerguntaFichaColetaComponent },
    { path: 'cadastrar', component: PerguntaFichaColetaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: PerguntaFichaColetaFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: PerguntaFichaColetaFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(perguntaFichaColetaRoutes)],
    exports: [RouterModule]
})
export class PerguntaFichaColetaRoutingModule {}