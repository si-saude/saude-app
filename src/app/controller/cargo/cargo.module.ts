import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { CargoComponent } from './cargo.component';
import { CargoService } from './cargo.service';
import { CargoFormComponent } from './cargo-form/cargo-form.component';
import { CargoFormDetailComponent } from './cargo-form/cargo-form-detail.component';
import { CargoRoutingModule } from './cargo.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CargoComponent,
       CargoFormComponent,
       CargoFormDetailComponent
     ],
     imports: [
        CargoRoutingModule,
        SharedModule
     ],
     providers: [
        CargoService
     ]
})
export class CargoModule{}