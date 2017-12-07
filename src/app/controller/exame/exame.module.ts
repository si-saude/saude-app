import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ExameComponent } from './exame.component';
import { ExameService } from './exame.service';
import { ExameRoutingModule } from './exame.routing.module';
import { SharedModule } from './../shared.module';
import { ExameFormComponent } from './exame-form/exame-form.component';
import { ExameFormDetailComponent } from './exame-form/exame-form-detail.component';

@NgModule({
    declarations: [
       ExameComponent,
       ExameFormComponent,
       ExameFormDetailComponent
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