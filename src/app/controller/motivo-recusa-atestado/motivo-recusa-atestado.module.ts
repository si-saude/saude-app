import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MotivoRecusaAtestadoComponent } from './motivo-recusa-atestado.component';
import { MotivoRecusaAtestadoService } from './motivo-recusa-atestado.service';
import { MotivoRecusaAtestadoFormComponent } from './motivo-recusa-atestado-form/motivo-recusa-atestado-form.component';
import { MotivoRecusaAtestadoFormDetailComponent } from './motivo-recusa-atestado-form/motivo-recusa-atestado-form-detail.component';
import { MotivoRecusaAtestadoRoutingModule } from './motivo-recusa-atestado.routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       MotivoRecusaAtestadoComponent,
       MotivoRecusaAtestadoFormComponent,
       MotivoRecusaAtestadoFormDetailComponent
     ],
     imports: [
        MotivoRecusaAtestadoRoutingModule,
        SharedModule
     ],
     providers: [
        MotivoRecusaAtestadoService
     ]
})
export class MotivoRecusaAtestadoModule{}