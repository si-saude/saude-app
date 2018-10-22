import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndicadorConhecimentoAlimentarComponent } from './indicador-conhecimento-alimentar.component';
import { IndicadorConhecimentoAlimentarService } from './indicador-conhecimento-alimentar.service';
import { IndicadorConhecimentoAlimentarFormComponent } from './indicador-conhecimento-alimentar-form/indicador-conhecimento-alimentar-form.component';
import { IndicadorConhecimentoAlimentarFormDetailComponent } from './indicador-conhecimento-alimentar-form/indicador-conhecimento-alimentar-form-detail.component';
import { IndicadorConhecimentoAlimentarRoutingModule } from './indicador-conhecimento-alimentar.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       IndicadorConhecimentoAlimentarComponent,
       IndicadorConhecimentoAlimentarFormComponent,
       IndicadorConhecimentoAlimentarFormDetailComponent
     ],
     imports: [
        IndicadorConhecimentoAlimentarRoutingModule,
        SharedModule
     ],
     providers: [
        IndicadorConhecimentoAlimentarService
     ]
})
export class IndicadorConhecimentoAlimentarModule{}