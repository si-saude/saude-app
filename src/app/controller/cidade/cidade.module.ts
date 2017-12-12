import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { CidadeComponent } from './cidade.component';
import { CidadeService } from './cidade.service';
import { CidadeRoutingModule } from './cidade.routing.module';
import { CidadeFormComponent } from './cidade-form/cidade-form.component';
import { CidadeFormDetailComponent } from './cidade-form/cidade-form-detail.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CidadeComponent,
       CidadeFormComponent,
       CidadeFormDetailComponent
     ],
     imports: [
        CidadeRoutingModule,
        SharedModule
     ],
     providers: [
        CidadeService
     ]
})
export class CidadeModule{}