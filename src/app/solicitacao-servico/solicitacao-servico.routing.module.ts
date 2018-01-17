import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutenticacaoUsuarioComponent } from './autenticacao-usuario/autenticacao-usuario.component';
import { SelecaoServicoComponent } from './selecao-servico/selecao-servico.component';
import { AtendimentoOcupacionalComponent } from './atendimento-ocupacional/atendimento-ocupacional.component';
    
const solicitacaoServicoRoutes: Routes = [
    { path: '', redirectTo: 'autenticacao-usuario', pathMatch: 'full' },
    { path: 'autenticacao-usuario', component: AutenticacaoUsuarioComponent },
    { path: 'selecao-servico', component: SelecaoServicoComponent },
    { path: 'atendimento-ocupacional', component: AtendimentoOcupacionalComponent }
];

@NgModule({
    imports: [RouterModule.forChild(solicitacaoServicoRoutes)],
    exports: [RouterModule]
})
export class SolicitacaoServicoRoutingModule {}