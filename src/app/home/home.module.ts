import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from './../controller/shared.module';

@NgModule({
    declarations: [
       HomeComponent
     ],
     imports: [
        HomeRoutingModule,
        SharedModule
     ]
})
export class HomeModule{}