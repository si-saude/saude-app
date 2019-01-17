import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { AtendimentoAvulsoComponent } from './atendimento-avulso.component';
import { AtendimentoService } from './../atendimento/atendimento.service';
import { AtendimentoAvulsoRoutingModule } from './atendimento-avulso.routing.module';
import { AtendimentoAvulsoFormComponent } from './atendimento-avulso-form/atendimento-avulso-form.component';
import { AtendimentoAvulsoFormDetailComponent } from './atendimento-avulso-form/atendimento-avulso-form-detail.component';
import { ModalFilaAtendimentoOcupacionalModule } from './../../includes/modal-fila-atendimento-ocupacional/modal-fila-atendimento-ocupacional.module';
import { ModalTarefaModule } from './../../includes/modal-tarefa/modal-tarefa.module';
import { ModalFilaEsperaOcupacionalModule } from './../../includes/modal-fila-espera-ocupacional/modal-fila-espera-ocupacional.module';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';
import { FichaColetaModule } from './../ficha-coleta.module';
import { TriagemModule } from './../triagem.module';
import { PlanejamentoModule } from './../planejamento.module';
import { InformacaoAsoModule } from './../../includes/informacao-aso/informacao-aso.module';
import { AtendimentoInformacoesEmpregadoModule } from './../../includes/atendimento-informacoes-empregado/atendimento-informacoes-empregado.module';
import { AtendimentoProafModule } from './../../includes/atendimento-proaf/atendimento-proaf.module';

@NgModule({
    declarations: [
       AtendimentoAvulsoComponent,
       AtendimentoAvulsoFormComponent,
       AtendimentoAvulsoFormDetailComponent
     ],
     imports: [
        ModalFilaAtendimentoOcupacionalModule,
        ModalFilaEsperaOcupacionalModule,
        ModalTarefaModule,
        AtendimentoAvulsoRoutingModule,
        PipesModule,
        FichaColetaModule,
        TriagemModule,
        PlanejamentoModule,
        SharedModule,
        InformacaoAsoModule,
        AtendimentoInformacoesEmpregadoModule,
        AtendimentoProafModule
        
     ],
     providers: [
        AtendimentoService
     ]
})
export class AtendimentoAvulsoModule{}