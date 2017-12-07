import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegimeComponent } from './regime.component';
import { RegimeService } from './regime.service';
import { RegimeFormComponent } from './regime-form/regime-form.component';
import { RegimeFormDetailComponent } from './regime-form/regime-form-detail.component';
import { RegimeRoutingModule } from './regime.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       RegimeComponent,
       RegimeFormComponent,
       RegimeFormDetailComponent
     ],
     imports: [
        RegimeRoutingModule,
        SharedModule
     ],
     providers: [
        RegimeService
     ]
})
export class RegimeModule{}