import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { ProfissionalSaudeComponent } from './profissional-saude.component';
import { ProfissionalSaudeService } from './profissional-saude.service';
import { ProfissionalSaudeRoutingModule } from './profissional-saude.routing.module';
import { SharedModule } from './../shared.module';
import { ProfissionalSaudeCadastrarComponent } from './profissional-saude-cadastrar/profissional-saude-cadastrar.component';
import { ProfissionalSaudeEditarComponent } from './profissional-saude-editar/profissional-saude-editar.component';
import { ProfissionalSaudeFormComponent } from './profissional-saude-form/profissional-saude-form.component';

@NgModule({
    declarations: [
       ProfissionalSaudeComponent,
       ProfissionalSaudeFormComponent,
       ProfissionalSaudeCadastrarComponent,
       ProfissionalSaudeEditarComponent
     ],
     imports: [
        ProfissionalSaudeRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        ProfissionalSaudeService
     ]
})
export class ProfissionalSaudeModule{}