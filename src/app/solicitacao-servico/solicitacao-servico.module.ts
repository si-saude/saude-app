import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { Ng2InputMaskModule } from 'ng2-input-mask';

import { SelecaoServicoComponent } from './selecao-servico/selecao-servico.component';
import { AutenticacaoUsuarioComponent } from './autenticacao-usuario/autenticacao-usuario.component';
import { AtendimentoOcupacionalComponent } from './atendimento-ocupacional/atendimento-ocupacional.component';
import { SolicitacaoServicoService } from './solicitacao-servico.service';
import { TransferDataService } from './transfer-data.service';
import { SolicitacaoServicoRoutingModule } from './solicitacao-servico.routing.module';
import { SharedModule } from './../controller/shared.module';

@NgModule({
    declarations: [
       SelecaoServicoComponent,
       AutenticacaoUsuarioComponent,
       AtendimentoOcupacionalComponent
     ],
     imports: [
        SolicitacaoServicoRoutingModule,
        MyDatePickerModule,
        Ng2InputMaskModule,
        SharedModule
     ],
     providers: [
        SolicitacaoServicoService,
        TransferDataService
     ]
})
export class SolicitacaoServicoModule{}