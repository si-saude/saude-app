import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { GerenciaComponent } from './gerencia.component';
import { GerenciaService } from './gerencia.service';
import { GerenciaRoutingModule } from './gerencia.routing.module';
import { GerenciaFormComponent } from './gerencia-form/gerencia-form.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       GerenciaComponent,
       GerenciaFormComponent
     ],
     imports: [
        GerenciaRoutingModule,
        SharedModule
     ],
     providers: [
        GerenciaService
     ]
})
export class GerenciaModule{}