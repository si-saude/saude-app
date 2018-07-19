import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EnfaseComponent } from './enfase.component';
import { EnfaseService } from './enfase.service';
import { EnfaseFormComponent } from './enfase-form/enfase-form.component';
import { EnfaseFormDetailComponent } from './enfase-form/enfase-form-detail.component';
import { EnfaseRoutingModule } from './enfase.routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       EnfaseComponent,
       EnfaseFormComponent,
       EnfaseFormDetailComponent
     ],
     imports: [
        EnfaseRoutingModule,
        SharedModule
     ],
     providers: [
        EnfaseService
     ]
})
export class EnfaseModule{}