import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { IndicadorRiscoErgonomicoComponent } from './indicador-risco-ergonomico.component';
import { IndicadorRiscoErgonomicoService } from './indicador-risco-ergonomico.service';
import { IndicadorRiscoErgonomicoRoutingModule } from './indicador-risco-ergonomico.routing.module';
import { SharedModule } from './../shared.module';
import { IndicadorRiscoErgonomicoFormComponent } from './indicador-risco-ergonomico-form/indicador-risco-ergonomico-form.component';
import { IndicadorRiscoErgonomicoFormDetailComponent } from './indicador-risco-ergonomico-form/indicador-risco-ergonomico-form-detail.component';

@NgModule({
    declarations: [
       IndicadorRiscoErgonomicoComponent,
       IndicadorRiscoErgonomicoFormComponent,
       IndicadorRiscoErgonomicoFormDetailComponent
     ],
     imports: [
        IndicadorRiscoErgonomicoRoutingModule,
        SharedModule
     ],
     providers: [
        IndicadorRiscoErgonomicoService
     ]
})
export class IndicadorRiscoErgonomicoModule{}