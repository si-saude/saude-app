import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { DataTableModule } from "angular2-datatable";
import { MaterializeModule } from "angular2-materialize";

import { PanoramaComponent } from './panorama/panorama.component';
import { PanoramaService } from './panorama/panorama.service';
import { SharedModule } from './../controller/shared.module';
import { ReportsRoutingModule } from './reports.routing.module';
import { TransformDatePipe } from './../pipes/transform-date.pipe';
import { FilterDataPipe } from './../pipes/filter-data.pipe';

@NgModule( {
    imports: [
        SharedModule,
        MyDatePickerModule,
        DataTableModule,
        MaterializeModule,
        ReportsRoutingModule
    ],
    declarations: [
        PanoramaComponent,
        TransformDatePipe,
        FilterDataPipe
    ],
    providers: [
        PanoramaService
    ]
} )
export class ReportsModule {}