import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
//import { DataTablesModule } from 'angular-datatables';

import { ProfissiogramaComponent } from './profissiograma.component';
import { ProfissiogramaService } from './profissiograma.service';
import { ProfissiogramaRoutingModule } from './profissiograma.routing.module';
import { SharedModule } from './../shared.module';
import { ProfissiogramaFormComponent } from './profissiograma-form/profissiograma-form.component';

@NgModule({
    declarations: [
       ProfissiogramaComponent,
       ProfissiogramaFormComponent
     ],
     imports: [
        ProfissiogramaRoutingModule,
        MyDatePickerModule,
//        DataTablesModule,
        SharedModule
     ],
     providers: [
        ProfissiogramaService
     ]
})
export class ProfissiogramaModule{}