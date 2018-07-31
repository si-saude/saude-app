import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgenteCausadorComponent } from './agente-causador.component';
import { AgenteCausadorService } from './agente-causador.service';
import { AgenteCausadorFormComponent } from './agente-causador-form/agente-causador-form.component';
import { AgenteCausadorFormDetailComponent } from './agente-causador-form/agente-causador-form-detail.component';
import { AgenteCausadorRoutingModule } from './agente-causador.routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       AgenteCausadorComponent,
       AgenteCausadorFormComponent,
       AgenteCausadorFormDetailComponent
     ],
     imports: [
        AgenteCausadorRoutingModule,
        SharedModule
     ],
     providers: [
        AgenteCausadorService
     ]
})
export class AgenteCausadorModule{}