import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ParteCorpoAtingidaComponent } from './parte-corpo-atingida.component';
import { ParteCorpoAtingidaService } from './parte-corpo-atingida.service';
import { ParteCorpoAtingidaFormComponent } from './parte-corpo-atingida-form/parte-corpo-atingida-form.component';
import { ParteCorpoAtingidaFormDetailComponent } from './parte-corpo-atingida-form/parte-corpo-atingida-form-detail.component';
import { ParteCorpoAtingidaRoutingModule } from './parte-corpo-atingida.routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       ParteCorpoAtingidaComponent,
       ParteCorpoAtingidaFormComponent,
       ParteCorpoAtingidaFormDetailComponent
     ],
     imports: [
        ParteCorpoAtingidaRoutingModule,
        SharedModule
     ],
     providers: [
        ParteCorpoAtingidaService
     ]
})
export class ParteCorpoAtingidaModule{}