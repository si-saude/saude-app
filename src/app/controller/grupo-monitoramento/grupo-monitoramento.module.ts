import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { GrupoMonitoramentoComponent } from './grupo-monitoramento.component';
import { GrupoMonitoramentoService } from './grupo-monitoramento.service';
import { GrupoMonitoramentoRoutingModule } from './grupo-monitoramento.routing.module';
import { SharedModule } from './../shared.module';
import { GrupoMonitoramentoFormComponent } from './grupo-monitoramento-form/grupo-monitoramento-form.component';

@NgModule({
    declarations: [
       GrupoMonitoramentoComponent,
       GrupoMonitoramentoFormComponent
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