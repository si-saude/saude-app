import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiscoPotencialComponent } from './risco-potencial.component';
import { AcoesComponent } from './acoes/acoes.component';
import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';
import { FichaColetaComponent } from './ficha-coleta/ficha-coleta.component';
import { PlanejamentoComponent } from './planejamento/planejamento.component';
import { CriarPlanoComponent } from './criar-plano/criar-plano.component';
import { TriagemComponent } from './triagem/triagem.component';
import { TriagemReavaliacaoComponent } from './triagem-reavaliacao/triagem-reavaliacao.component';
import { GraficosComponent } from './graficos/graficos.component';
import { PlanoIntervencaoComponent } from './plano-intervencao/plano-intervencao.component';
import { AcolhimentoComponent } from './acolhimento/acolhimento.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const riscoPotencialRoutes: Routes = [
    { path: '', component: RiscoPotencialComponent},
    { path: 'triagem/:id', component: TriagemComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'triagem-reavaliacao/:id', component: TriagemReavaliacaoComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'acoes/:id', component: AcoesComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'acompanhamento/:id', component: AcompanhamentoComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'ficha-coleta/:id', component: FichaColetaComponent},
    { path: 'planejamento/:id/:empregado', component: PlanejamentoComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'criar-plano/:id', component: CriarPlanoComponent},
    { path: 'graficos/:id', component: GraficosComponent},
    { path: 'acolhimento/:id', component: AcolhimentoComponent},
    { path: 'plano-intervencao/:id', component: PlanoIntervencaoComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(riscoPotencialRoutes)],
    exports: [RouterModule]
})
export class RiscoPotencialRoutingModule {}