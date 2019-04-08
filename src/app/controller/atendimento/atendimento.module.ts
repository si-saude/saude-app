import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { DataTableModule } from "angular2-datatable";

import { AtendimentoService } from './atendimento.service';
import { AtendimentoFormComponent } from './atendimento-form/atendimento-form.component';
import { AtendimentoComponent } from './atendimento.component';
import { AtendimentoRoutingModule } from './atendimento.routing.module';
import { PlanejamentoModule } from './../planejamento.module';
import { SharedModule } from './../shared.module';
import { FichaColetaModule } from './../ficha-coleta.module';
import { TriagemModule } from './../triagem.module';
import { AcolhimentoModule } from './../acolhimento.module';
import { InformacaoAsoModule } from './../../includes/informacao-aso/informacao-aso.module';
import { MenuAtendimentoNutricaoModule } from './../../includes/menu-atendimento-nutricao/menu-atendimento-nutricao.module';
import { AtendimentoProafModule } from './../../includes/atendimento-proaf/atendimento-proaf.module';
import { AtendimentoInformacoesEmpregadoModule } from './../../includes/atendimento-informacoes-empregado/atendimento-informacoes-empregado.module';
import { InformacaoAvaliacaoHigieneOcupacionalModule } from './../../includes/informacao-avaliacao-higiene-ocupacional/informacao-avaliacao-higiene-ocupacional.module';

@NgModule({
    declarations: [
       AtendimentoFormComponent,
       AtendimentoComponent
     ],
     imports: [
        CommonModule,
        AtendimentoRoutingModule,
        DataTableModule,
        SharedModule,
        PlanejamentoModule,
        FichaColetaModule,
        TriagemModule,
        AcolhimentoModule,
        InformacaoAsoModule,
        MenuAtendimentoNutricaoModule,
        AtendimentoProafModule,
        AtendimentoInformacoesEmpregadoModule,
        InformacaoAvaliacaoHigieneOcupacionalModule
     ],
     providers: [
        AtendimentoService
     ]
})
export class AtendimentoModule{}