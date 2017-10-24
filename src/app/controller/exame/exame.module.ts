import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ExameComponent } from './exame.component';
import { ExameService } from './exame.service';
import { ExameRoutingModule } from './exame.routing.module';
import { SharedModule } from './../shared.module';
import { ExameFormComponent } from './exame-form/exame-form.component';

@NgModule({
    declarations: [
       ExameComponent,
       ExameFormComponent
     ],
     imports: [
        ExameRoutingModule,
        SharedModule
     ],
     providers: [
        ExameService
     ]
})
export class ExameModule{}