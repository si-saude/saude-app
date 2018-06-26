import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarComponent } from "angular2-fullcalendar/src/calendar/calendar";
import { MaterializeModule } from 'angular2-materialize';

import { AgendaPeriodicoComponent } from './agenda-periodico.component';
import { AgendaPeriodicoService } from './agenda-periodico.service';
import { AgendaPeriodicoRoutingModule } from './agenda-periodico.routing.module';
import { SharedModule } from './../controller/shared.module';
import { PipesModule } from './../controller/pipes.module';

@NgModule({
    declarations: [
       AgendaPeriodicoComponent,
       CalendarComponent
     ],
     imports: [
        AgendaPeriodicoRoutingModule,
        SharedModule,
        MaterializeModule,
        PipesModule
     ],
     providers: [
        AgendaPeriodicoService
     ]
})
export class AgendaPeriodicoModule{}