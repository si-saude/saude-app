import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiscoPotencialComponent } from './risco-potencial.component';
import { AcoesComponent } from './acoes/acoes.component';
import { AcolhimentoComponent } from './acolhimento/acolhimento.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { PlanejamentoComponent } from './planejamento/planejamento.component';
import { TriagemComponent } from './triagem/triagem.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const riscoPotencialRoutes: Routes = [
    { path: '', component: RiscoPotencialComponent},
    { path: 'triagem/:id', component: TriagemComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'acoes/:id', component: AcoesComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'avaliacao/:id', component: AvaliacaoComponent,
            canDeactivate: [CanDeactivateGuard]},
    { path: 'planejamento/:id', component: PlanejamentoComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'acolhimento/:id', component: AcolhimentoComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(riscoPotencialRoutes)],
    exports: [RouterModule]
})
export class RiscoPotencialRoutingModule {}