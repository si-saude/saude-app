import { NgModule } from '@angular/core';

import { MaterializeModule } from 'angular2-materialize';
import { MyDatePickerModule } from 'mydatepicker';

import { GheeComponent } from './ghee.component';
import { GheeService } from './ghee.service';
import { GheeFormComponent } from './ghee-form/ghee-form.component';
import { GheeRoutingModule } from './ghee.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       GheeComponent,
       GheeFormComponent
     ],
     imports: [
        GheeRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        GheeService
     ]
})
export class GheeModule{}