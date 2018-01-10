import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RequisitoAsoComponent } from './requisito-aso.component';
import { RequisitoAsoService } from './requisito-aso.service';
import { RequisitoAsoFormComponent } from './requisito-aso-form/requisito-aso-form.component';
import { RequisitoAsoFormDetailComponent } from './requisito-aso-form/requisito-aso-form-detail.component';
import { RequisitoAsoRoutingModule } from './requisito-aso.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       RequisitoAsoComponent,
       RequisitoAsoFormComponent,
       RequisitoAsoFormDetailComponent
     ],
     imports: [
        RequisitoAsoRoutingModule,
        SharedModule
     ],
     providers: [
        RequisitoAsoService
     ]
})
export class RequisitoAsoModule{}