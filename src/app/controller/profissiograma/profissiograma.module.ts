import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { ProfissiogramaComponent } from './profissiograma.component';
import { ProfissiogramaService } from './profissiograma.service';
import { ProfissiogramaRoutingModule } from './profissiograma.routing.module';
import { SharedModule } from './../shared.module';
import { ProfissiogramaFormComponent } from './profissiograma-form/profissiograma-form.component';
import { ProfissiogramaFormDetailComponent } from './profissiograma-form/profissiograma-form-detail.component';

@NgModule({
    declarations: [
       ProfissiogramaComponent,
       ProfissiogramaFormComponent,
       ProfissiogramaFormDetailComponent
     ],
     imports: [
        ProfissiogramaRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        ProfissiogramaService
     ]
})
export class ProfissiogramaModule{}