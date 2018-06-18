import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgenteRiscoComponent } from './agente-risco.component';
import { AgenteRiscoService } from './agente-risco.service';
import { AgenteRiscoFormComponent } from './agente-risco-form/agente-risco-form.component';
import { AgenteRiscoFormDetailComponent } from './agente-risco-form/agente-risco-form-detail.component';
import { AgenteRiscoRoutingModule } from './agente-risco.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       AgenteRiscoComponent,
       AgenteRiscoFormComponent,
       AgenteRiscoFormDetailComponent
     ],
     imports: [
        AgenteRiscoRoutingModule,
        SharedModule
     ],
     providers: [
        AgenteRiscoService
     ]
})
export class AgenteRiscoModule{}