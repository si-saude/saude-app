import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckInComponent } from './check-in/check-in.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { FilaComponent } from './fila/fila.component';
import { QuadroAtendimentoComponent } from './quadro-atendimento/quadro-atendimento.component';
import { DeclaracaoComparecimentoComponent } from './declaracao-comparecimento/declaracao-comparecimento.component';
import { QuadroAtendimentoGuard } from './../../guards/guards-child/quadro-atendimento.guard';
import { DeclaracaoComparecimentoGuard } from './../../guards/guards-child/declaracao-comparecimento.guard';
    
const filaEsperaOcupacional: Routes = [
    { path: 'check-in', component: CheckInComponent },
    { path: 'check-out', component: CheckOutComponent },
    { path: 'fila', component: FilaComponent },
    { path: 'quadro-atendimento', component: QuadroAtendimentoComponent,
        canActivate: [QuadroAtendimentoGuard]},
    { path: 'declaracao-comparecimento', component: DeclaracaoComparecimentoComponent,
        canActivate: [DeclaracaoComparecimentoGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(filaEsperaOcupacional)],
    exports: [RouterModule]
})
export class FilaEsperaOcupacionalRoutingModule {}