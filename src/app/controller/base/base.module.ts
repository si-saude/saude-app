import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseComponent } from './base.component';
import { BaseService } from './base.service';
import { BaseFormComponent } from './base-form/base-form.component';
import { BaseRoutingModule } from './base.routing.module';
import { SharedModule } from './../shared.module';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

@NgModule({
    declarations: [
       BaseComponent,
       BaseFormComponent
     ],
     imports: [
        BaseRoutingModule,
        SharedModule
     ],
     providers: [
        BaseService,
        CanDeactivateGuard
     ]
})
export class BaseModule{}