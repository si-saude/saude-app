import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RiscoGheComponent } from './risco-ghe.component';
import { RiscoGheService } from './risco-ghe.service';
import { RiscoGheFormComponent } from './risco-ghe-form/risco-ghe-form.component';
import { RiscoGheFormDetailComponent } from './risco-ghe-form/risco-ghe-form-detail.component';
import { RiscoGheRoutingModule } from './risco-ghe.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       RiscoGheComponent,
       RiscoGheFormComponent,
       RiscoGheFormDetailComponent
     ],
     imports: [
        RiscoGheRoutingModule,
        SharedModule
     ],
     providers: [
        RiscoGheService
     ]
})

export class RiscoGheModule{}