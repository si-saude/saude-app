import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VacinaComponent } from './vacina.component';
import { VacinaService } from './vacina.service';
import { VacinaFormComponent } from './vacina-form/vacina-form.component';
import { VacinaFormDetailComponent } from './vacina-form/vacina-form-detail.component';
import { VacinaRoutingModule } from './vacina.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       VacinaComponent,
       VacinaFormComponent,
       VacinaFormDetailComponent
     ],
     imports: [
        VacinaRoutingModule,
        SharedModule
     ],
     providers: [
        VacinaService
     ]
})
export class VacinaModule{}