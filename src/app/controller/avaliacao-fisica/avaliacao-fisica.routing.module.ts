import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacaoFisicaComponent } from '../avaliacao-fisica/avaliacao-fisica.component';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { AvaliacaoFisicaGuard } from '../../guards/guards-child/avaliacao-fisica.guard';

const avaliacaoFisicaRoutes: Routes = [
    { path: '', component: AvaliacaoFisicaComponent}
];

@NgModule({
    imports: [RouterModule.forChild(avaliacaoFisicaRoutes)],
    exports: [RouterModule]
})
export class AvaliacaoFisicaRoutingModule {}