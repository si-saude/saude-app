import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SolicitacaoCentralIntegraService } from './solicitacao-central-integra.service';
import { SolicitacaoCentralIntegraFormComponent } from './solicitacao-central-integra-form/solicitacao-central-integra-form.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       SolicitacaoCentralIntegraFormComponent
     ],
     imports: [
        SharedModule
     ],
     providers: [
        SolicitacaoCentralIntegraService
     ]
})
export class SolicitacaoCentralIntegraModule{}