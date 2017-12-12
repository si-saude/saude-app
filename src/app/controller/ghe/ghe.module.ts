import { NgModule } from '@angular/core';

import { MaterializeModule } from 'angular2-materialize';
import { MyDatePickerModule } from 'mydatepicker';

import { GheComponent } from './ghe.component';
import { GheService } from './ghe.service';
import { GheFormComponent } from './ghe-form/ghe-form.component';
import { GheFormDetailComponent } from './ghe-form/ghe-form-detail.component';
import { GheRoutingModule } from './ghe.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       GheComponent,
       GheFormComponent,
       GheFormDetailComponent
     ],
     imports: [
        GheRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        GheService
     ]
})
export class GheModule{}