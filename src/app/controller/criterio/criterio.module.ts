import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CriterioComponent } from './criterio.component';
import { CriterioService } from './criterio.service';
import { CriterioFormComponent } from './criterio-form/criterio-form.component';
import { CriterioRoutingModule } from './criterio.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CriterioComponent,
       CriterioFormComponent
     ],
     imports: [
        CriterioRoutingModule,
        SharedModule
     ],
     providers: [
        CriterioService
     ]
})
export class CriterioModule{}