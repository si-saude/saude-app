import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TipoGrupoMonitoramentoComponent } from './tipo-grupo-monitoramento.component';
import { TipoGrupoMonitoramentoService } from './tipo-grupo-monitoramento.service';
import { TipoGrupoMonitoramentoFormComponent } from './tipo-grupo-monitoramento-form/tipo-grupo-monitoramento-form.component';
import { TipoGrupoMonitoramentoFormDetailComponent } from './tipo-grupo-monitoramento-form/tipo-grupo-monitoramento-form-detail.component';
import { TipoGrupoMonitoramentoRoutingModule } from './tipo-grupo-monitoramento.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       TipoGrupoMonitoramentoComponent,
       TipoGrupoMonitoramentoFormComponent,
       TipoGrupoMonitoramentoFormDetailComponent
     ],
     imports: [
        TipoGrupoMonitoramentoRoutingModule,
        SharedModule
     ],
     providers: [
        TipoGrupoMonitoramentoService
     ]
})
export class TipoGrupoMonitoramentoModule{}