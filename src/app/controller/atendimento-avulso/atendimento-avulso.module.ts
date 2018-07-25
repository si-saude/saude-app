import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';
import { MyDatePickerModule } from 'mydatepicker';

import { AtendimentoAvulsoComponent } from './atendimento-avulso.component';
import { AtendimentoService } from './../atendimento/atendimento.service';
import { AtendimentoAvulsoRoutingModule } from './atendimento-avulso.routing.module';
import { AtendimentoAvulsoFormComponent } from './atendimento-avulso-form/atendimento-avulso-form.component';
import { AtendimentoAvulsoFormDetailComponent } from './atendimento-avulso-form/atendimento-avulso-form-detail.component';
import { ModalFilaAtendimentoOcupacionalModule } from './../../includes/modal-fila-atendimento-ocupacional/modal-fila-atendimento-ocupacional.module';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';

@NgModule({
    declarations: [
       AtendimentoAvulsoComponent,
       AtendimentoAvulsoFormComponent,
       AtendimentoAvulsoFormDetailComponent
     ],
     imports: [
        ModalFilaAtendimentoOcupacionalModule,
        AtendimentoAvulsoRoutingModule,
        PipesModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        AtendimentoService
     ]
})
export class AtendimentoAvulsoModule{}