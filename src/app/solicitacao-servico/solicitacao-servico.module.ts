import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { Ng2InputMaskModule } from 'ng2-input-mask';

import { SelecaoServicoComponent } from './selecao-servico/selecao-servico.component';
import { AutenticacaoUsuarioComponent } from './autenticacao-usuario/autenticacao-usuario.component';
import { MudancaFuncaoComponent } from './mudanca-funcao/mudanca-funcao.component';
import { AtendimentoOcupacionalComponent } from './atendimento-ocupacional/atendimento-ocupacional.component';
import { SolicitacaoCentralIntegraComponent } from './solicitacao-central-integra/solicitacao-central-integra.component';
import { HomologacaoAtestadoComponent } from './homologacao-atestado/homologacao-atestado.component';
import { ExamePericialComponent } from './exame-pericial/exame-pericial.component';
import { SolicitacaoServicoService } from './solicitacao-servico.service';
import { SolicitacaoServicoRoutingModule } from './solicitacao-servico.routing.module';
import { ModalHomologacaoAtestadoModule } from './../includes/modal-homologacao-atestado/modal-homologacao-atestado.module';
import { SharedModule } from './../controller/shared.module';

@NgModule({
    declarations: [
       SelecaoServicoComponent,
       AutenticacaoUsuarioComponent,
       AtendimentoOcupacionalComponent,
       SolicitacaoCentralIntegraComponent,
       HomologacaoAtestadoComponent,
       MudancaFuncaoComponent,
       ExamePericialComponent
     ],
     imports: [
        SolicitacaoServicoRoutingModule,
        MyDatePickerModule,
        Ng2InputMaskModule,
        ModalHomologacaoAtestadoModule,
        SharedModule
     ],
     providers: [
        SolicitacaoServicoService
     ]
})
export class SolicitacaoServicoModule{}