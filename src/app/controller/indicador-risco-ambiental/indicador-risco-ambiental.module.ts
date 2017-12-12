import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { IndicadorRiscoAmbientalComponent } from './indicador-risco-ambiental.component';
import { IndicadorRiscoAmbientalService } from './indicador-risco-ambiental.service';
import { IndicadorRiscoAmbientalRoutingModule } from './indicador-risco-ambiental.routing.module';
import { SharedModule } from './../shared.module';
import { IndicadorRiscoAmbientalFormComponent } from './indicador-risco-ambiental-form/indicador-risco-ambiental-form.component';
import { IndicadorRiscoAmbientalFormDetailComponent } from './indicador-risco-ambiental-form/indicador-risco-ambiental-form-detail.component';

@NgModule({
    declarations: [
       IndicadorRiscoAmbientalComponent,
       IndicadorRiscoAmbientalFormComponent,
       IndicadorRiscoAmbientalFormDetailComponent
     ],
     imports: [
        IndicadorRiscoAmbientalRoutingModule,
        SharedModule
     ],
     providers: [
        IndicadorRiscoAmbientalService
     ]
})
export class IndicadorRiscoAmbientalModule{}