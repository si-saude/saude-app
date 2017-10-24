import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { IndicadorRiscoSaudeAmbientalComponent } from './indicador-risco-saude-ambiental.component';
import { IndicadorRiscoSaudeAmbientalService } from './indicador-risco-saude-ambiental.service';
import { IndicadorRiscoSaudeAmbientalRoutingModule } from './indicador-risco-saude-ambiental.routing.module';
import { SharedModule } from './../shared.module';
import { IndicadorRiscoSaudeAmbientalFormComponent } from './indicador-risco-saude-ambiental-form/indicador-risco-saude-ambiental-form.component';

@NgModule({
    declarations: [
       IndicadorRiscoSaudeAmbientalComponent,
       IndicadorRiscoSaudeAmbientalFormComponent
     ],
     imports: [
        IndicadorRiscoSaudeAmbientalRoutingModule,
        SharedModule
     ],
     providers: [
        IndicadorRiscoSaudeAmbientalService
     ]
})
export class IndicadorRiscoSaudeAmbientalModule{}