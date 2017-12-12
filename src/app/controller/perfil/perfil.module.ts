import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { PerfilComponent } from './perfil.component';
import { PerfilService } from './perfil.service';
import { PerfilRoutingModule } from './perfil.routing.module';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { PerfilFormDetailComponent } from './perfil-form/perfil-form-detail.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       PerfilComponent,
       PerfilFormComponent,
       PerfilFormDetailComponent
     ],
     imports: [
        PerfilRoutingModule,
        SharedModule
     ],
     providers: [
        PerfilService
     ]
})
export class PerfilModule{}