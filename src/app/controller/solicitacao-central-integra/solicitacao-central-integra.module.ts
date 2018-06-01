import { NgModule } from '@angular/core';

import { MyDatePickerModule } from 'mydatepicker';

import { ReportsModule } from './../../reports/reports.module';
import { SolicitacaoCentralIntegraService } from './solicitacao-central-integra.service';
import { SolicitacaoCentralIntegraFormComponent } from './solicitacao-central-integra-form/solicitacao-central-integra-form.component';
import { SolicitacaoCentralIntegraFormObservacaoComponent } from './solicitacao-central-integra-form/solicitacao-central-integra-form-observacao.component';
import { SolicitacaoCentralIntegraFormDescricaoComponent } from './solicitacao-central-integra-form/solicitacao-central-integra-form-descricao.component';
import { SolicitacaoCentralIntegraRoutingModule } from './solicitacao-central-integra.routing.module';
import { ModalEmpregadoModule } from './../modal-empregado.module';
import { ModalProfissionalModule } from './../modal-profissional.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       SolicitacaoCentralIntegraFormComponent,
       SolicitacaoCentralIntegraFormObservacaoComponent,
       SolicitacaoCentralIntegraFormDescricaoComponent
     ],
     imports: [
        SolicitacaoCentralIntegraRoutingModule,      
        SharedModule,
        MyDatePickerModule,
        ReportsModule,
        ModalEmpregadoModule,
        ModalProfissionalModule
     ],
     providers: [
        SolicitacaoCentralIntegraService
     ]
})
export class SolicitacaoCentralIntegraModule{}