import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { DiagnosticoComponent } from './diagnostico.component';
import { DiagnosticoService } from './diagnostico.service';
import { DiagnosticoRoutingModule } from './diagnostico.routing.module';
import { DiagnosticoFormComponent } from './diagnostico-form/diagnostico-form.component';
import { DiagnosticoFormDetailComponent } from './diagnostico-form/diagnostico-form-detail.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       DiagnosticoComponent,
       DiagnosticoFormComponent,
       DiagnosticoFormDetailComponent
     ],
     imports: [
        DiagnosticoRoutingModule,
        SharedModule
     ],
     providers: [
        DiagnosticoService
     ]
})
export class DiagnosticoModule{}