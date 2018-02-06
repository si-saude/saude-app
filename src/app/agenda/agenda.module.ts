import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarComponent } from "angular2-fullcalendar/src/calendar/calendar";
import { MaterializeModule } from 'angular2-materialize';

import { AgendaComponent } from './agenda.component';
import { AgendaService } from './agenda.service';
import { AgendaRoutingModule } from './agenda.routing.module';
import { SharedModule } from './../controller/shared.module';
import { DateHourPipe } from './../pipes/date-hour.pipe';

@NgModule({
    declarations: [
       AgendaComponent,
       CalendarComponent,
       DateHourPipe
     ],
     imports: [
        AgendaRoutingModule,
        SharedModule,
        MaterializeModule
     ],
     providers: [
        AgendaService
     ]
})
export class AgendaModule{}