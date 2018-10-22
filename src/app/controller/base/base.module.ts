import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseComponent } from './base.component';
import { BaseService } from './base.service';
import { BaseFormComponent } from './base-form/base-form.component';
import { BaseFormDetailComponent } from './base-form/base-form-detail.component';
import { BaseRoutingModule } from './base.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       BaseComponent,
       BaseFormComponent,
       BaseFormDetailComponent
     ],
     imports: [
        BaseRoutingModule,
        SharedModule
     ],
     providers: [
        BaseService
     ]
})
export class BaseModule{}