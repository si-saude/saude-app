import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { EixoComponent } from './eixo.component';
import { EixoService } from './eixo.service';
import { EixoRoutingModule } from './eixo.routing.module';
import { EixoFormComponent } from './eixo-form/eixo-form.component';
import { EixoFormDetailComponent } from './eixo-form/eixo-form-detail.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       EixoComponent,
       EixoFormComponent,
       EixoFormDetailComponent
     ],
     imports: [
        EixoRoutingModule,
        SharedModule
     ],
     providers: [
        EixoService
     ]
})
export class EixoModule{}