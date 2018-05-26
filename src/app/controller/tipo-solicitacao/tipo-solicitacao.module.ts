import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TipoSolicitacaoComponent } from './tipo-solicitacao.component';
import { TipoSolicitacaoService } from './tipo-solicitacao.service';
import { TipoSolicitacaoFormComponent } from './tipo-solicitacao/tipo-solicitacao-form.component';
import { TipoSolicitacaoFormDetailComponent } from './tipo-solicitacao/tipo-solicitacao-form-detail.component';
import { TipoSolicitacaoRoutingModule } from './tipo-solicitacao.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       TipoSolicitacaoComponent,
       TipoSolicitacaoFormComponent,
       TipoSolicitacaoFormDetailComponent
     ],
     imports: [
        TipoSolicitacaoRoutingModule,
        SharedModule
     ],
     providers: [
        TipoSolicitacaoService
     ]
})
export class TipoSolicitacaoModule{}