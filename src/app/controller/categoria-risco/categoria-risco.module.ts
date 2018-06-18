import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriaRiscoComponent } from './categoria-risco.component';
import { CategoriaRiscoService } from './categoria-risco.service';
import { CategoriaRiscoFormComponent } from './categoria-risco-form/categoria-risco-form.component';
import { CategoriaRiscoFormDetailComponent } from './categoria-risco-form/categoria-risco-form-detail.component';
import { CategoriaRiscoRoutingModule } from './categoria-risco.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CategoriaRiscoComponent,
       CategoriaRiscoFormComponent,
       CategoriaRiscoFormDetailComponent
     ],
     imports: [
        CategoriaRiscoRoutingModule,
        SharedModule
     ],
     providers: [
        CategoriaRiscoService
     ]
})
export class CategoriaRiscoModule{}