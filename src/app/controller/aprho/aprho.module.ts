import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { DataTableModule } from "angular2-datatable";

import { AprhoComponent } from './aprho.component';
import { AprhoService } from './aprho.service';
import { AprhoFormComponent } from './aprho-form/aprho-form.component';
import { AprhoFormDetailComponent } from './aprho-form/aprho-form-detail.component';
import { AprhoRoutingModule } from './aprho.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       AprhoComponent,
       AprhoFormComponent,
       AprhoFormDetailComponent
     ],
     imports: [
        AprhoRoutingModule,
        SharedModule,
        MyDatePickerModule,
        DataTableModule
     ],
     providers: [
        AprhoService
     ]
})
export class AprhoModule{}