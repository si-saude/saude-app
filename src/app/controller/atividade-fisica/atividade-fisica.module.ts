import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AtividadeFisicaComponent } from './atividade-fisica.component';
import { AtividadeFisicaService } from './atividade-fisica.service';
import { AtividadeFisicaFormComponent } from './atividade-fisica-form/atividade-fisica-form.component';
import { AtividadeFisicaFormDetailComponent } from './atividade-fisica-form/atividade-fisica-form-detail.component';
import { AtividadeFisicaRoutingModule } from './atividade-fisica.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       AtividadeFisicaComponent,
       AtividadeFisicaFormComponent,
       AtividadeFisicaFormDetailComponent
     ],
     imports: [
        AtividadeFisicaRoutingModule,
        SharedModule
     ],
     providers: [
        AtividadeFisicaService
     ]
})
export class AtividadeFisicaModule{}