import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { CursoComponent } from './curso.component';
import { CursoService } from './curso.service';
import { CursoRoutingModule } from './curso.routing.module';
import { CursoFormComponent } from './curso-form/curso-form.component';
import { CursoFormDetailComponent } from './curso-form/curso-form-detail.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CursoComponent,
       CursoFormComponent,
       CursoFormDetailComponent
     ],
     imports: [
        CursoRoutingModule,
        SharedModule
     ],
     providers: [
        CursoService
     ]
})
export class CursoModule{}