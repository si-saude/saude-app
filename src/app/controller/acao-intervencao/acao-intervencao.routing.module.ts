import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcaoIntervencaoComponent } from '../acao-intervencao/acao-intervencao.component';
import { AcaoIntervencaoFormComponent } from '../acao-intervencao/acao-intervencao-form/acao-intervencao-form.component';
import { AcaoIntervencaoFormDetailComponent } from '../acao-intervencao/acao-intervencao-form/acao-intervencao-form-detail.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { AcaoIntervencaoGuard } from '../../guards/guards-child/acao-intervencao.guard';

const acaoIntervencaoRoutes: Routes = [
    { path: '', component: AcaoIntervencaoComponent},
    { path: 'cadastrar', component: AcaoIntervencaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: AcaoIntervencaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: AcaoIntervencaoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(acaoIntervencaoRoutes)],
    exports: [RouterModule]
})
export class AcaoIntervencaoRoutingModule {}