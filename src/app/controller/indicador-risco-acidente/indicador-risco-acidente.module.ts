import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { IndicadorRiscoAcidenteComponent } from './indicador-risco-acidente.component';
import { IndicadorRiscoAcidenteService } from './indicador-risco-acidente.service';
import { IndicadorRiscoAcidenteRoutingModule } from './indicador-risco-acidente.routing.module';
import { SharedModule } from './../shared.module';
import { IndicadorRiscoAcidenteFormComponent } from './indicador-risco-acidente-form/indicador-risco-acidente-form.component';
import { IndicadorRiscoAcidenteFormDetailComponent } from './indicador-risco-acidente-form/indicador-risco-acidente-form-detail.component';

@NgModule({
    declarations: [
       IndicadorRiscoAcidenteComponent,
       IndicadorRiscoAcidenteFormComponent,
       IndicadorRiscoAcidenteFormDetailComponent
     ],
     imports: [
        IndicadorRiscoAcidenteRoutingModule,
        SharedModule
     ],
     providers: [
        IndicadorRiscoAcidenteService
     ]
})
export class IndicadorRiscoAcidenteModule{}