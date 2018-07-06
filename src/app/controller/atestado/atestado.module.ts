import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { AtestadoComponent } from './atestado.component';
import { AtestadoService } from './atestado.service';
import { AtestadoFormComponent } from './atestado-form/atestado-form.component';
import { AtestadoFormDetailComponent } from './atestado-form/atestado-form-detail.component';
import { AtestadoRoutingModule } from './atestado.routing.module';
import { PipesModule } from './../pipes.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       AtestadoComponent,
       AtestadoFormComponent,
       AtestadoFormDetailComponent
     ],
     imports: [
        AtestadoRoutingModule,
        MyDatePickerModule,
        SharedModule,
        PipesModule
     ],
     providers: [
        AtestadoService
     ]
})
export class AtestadoModule{}