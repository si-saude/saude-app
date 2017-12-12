import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { EquipeComponent } from './equipe.component';
import { EquipeService } from './equipe.service';
import { EquipeRoutingModule } from './equipe.routing.module';
import { SharedModule } from './../shared.module';
import { EquipeFormComponent } from './equipe-form/equipe-form.component';
import { EquipeFormDetailComponent } from './equipe-form/equipe-form-detail.component';

@NgModule({
    declarations: [
       EquipeComponent,
       EquipeFormComponent,
       EquipeFormDetailComponent
     ],
     imports: [
        SharedModule,
        EquipeRoutingModule
     ],
     providers: [
        EquipeService
     ] 
})
export class EquipeModule{}