import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FonteGeradoraComponent } from './fonte-geradora.component';
import { FonteGeradoraService } from './fonte-geradora.service';
import { FonteGeradoraFormDetailComponent } from './fonte-geradora-form/fonte-geradora-form-detail.component';
import { FonteGeradoraRoutingModule } from './fonte-geradora.routing.module';
import { SharedModule } from './../shared.module';
import { FonteGeradoraFormComponent } from './fonte-geradora-form/fonte-geradora-form.component';

@NgModule({
    declarations: [
       FonteGeradoraComponent,
       FonteGeradoraFormComponent,
       FonteGeradoraFormDetailComponent
       ],
     imports: [
        FonteGeradoraRoutingModule,
        SharedModule
     ],
     providers: [
        FonteGeradoraService
     ]
})
export class FonteGeradoraModule{}