import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { GrupoMonitoramentoComponent } from './grupo-monitoramento.component';
import { GrupoMonitoramentoService } from './grupo-monitoramento.service';
import { GrupoMonitoramentoRoutingModule } from './grupo-monitoramento.routing.module';
import { SharedModule } from './../shared.module';
import { GrupoMonitoramentoFormComponent } from './grupo-monitoramento-form/grupo-monitoramento-form.component';
import { GrupoMonitoramentoFormDetailComponent } from './grupo-monitoramento-form/grupo-monitoramento-form-detail.component';

@NgModule({
    declarations: [
       GrupoMonitoramentoComponent,
       GrupoMonitoramentoFormComponent,
       GrupoMonitoramentoFormDetailComponent 
     ],
     imports: [
        GrupoMonitoramentoRoutingModule,
        SharedModule
     ],
     providers: [
        GrupoMonitoramentoService
     ]
})
export class GrupoMonitoramentoModule{}