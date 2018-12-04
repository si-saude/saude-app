import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlimentoComponent } from '../alimento/alimento.component';
import { AlimentoFormComponent } from '../alimento/alimento-form/alimento-form.component';
import { AlimentoFormDetailComponent } from '../alimento/alimento-form/alimento-form-detail.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { AlimentoGuard } from '../../guards/guards-child/alimento.guard';

const alimentoRoutes: Routes = [
    { path: '', component: AlimentoComponent},
    { path: 'cadastrar', component: AlimentoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: AlimentoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: AlimentoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(alimentoRoutes)],
    exports: [RouterModule]
})
export class AlimentoRoutingModule {}