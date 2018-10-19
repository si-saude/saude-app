import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NutricaoAlimentoComponent } from './../nutricao-alimento/nutricao-alimento.component';
import { NutricaoAlimentoService } from './../nutricao-alimento/nutricao-alimento.service';
import { NutricaoAlimentoFormComponent } from './../nutricao-alimento/nutricao-alimento-form/nutricao-alimento-form.component';
import { NutricaoAlimentoFormDetailComponent } from './../nutricao-alimento/nutricao-alimento-form/nutricao-alimento-form-detail.component';
import { NutricaoAlimentoRoutingModule } from './../nutricao-alimento/nutricao-alimento.routing.module';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';

@NgModule({
    declarations: [
       NutricaoAlimentoComponent,
       NutricaoAlimentoFormComponent,
       NutricaoAlimentoFormDetailComponent
     ],
     imports: [
        NutricaoAlimentoRoutingModule,
        SharedModule,
        PipesModule
     ],
     providers: [
        NutricaoAlimentoService
     ]
})
export class NutricaoAlimentoModule{}