import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { IndicadorRiscoSanitarioComponent } from './indicador-risco-sanitario.component';
import { IndicadorRiscoSanitarioService } from './indicador-risco-sanitario.service';
import { IndicadorRiscoSanitarioRoutingModule } from './indicador-risco-sanitario.routing.module';
import { SharedModule } from './../shared.module';
import { IndicadorRiscoSanitarioFormComponent } from './indicador-risco-sanitario-form/indicador-risco-sanitario-form.component';
import { IndicadorRiscoSanitarioFormDetailComponent } from './indicador-risco-sanitario-form/indicador-risco-sanitario-form-detail.component';

@NgModule({
    declarations: [
       IndicadorRiscoSanitarioComponent,
       IndicadorRiscoSanitarioFormComponent,
       IndicadorRiscoSanitarioFormDetailComponent
     ],
     imports: [
        IndicadorRiscoSanitarioRoutingModule,
        SharedModule
     ],
     providers: [
        IndicadorRiscoSanitarioService
     ]
})
export class IndicadorRiscoSanitarioModule{}