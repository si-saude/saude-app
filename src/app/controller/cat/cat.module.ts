import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CatComponent } from './cat.component';
import { CatService } from './cat.service';
import { CatFormComponent } from './cat-form/cat-form.component';
import { CatFormDetailComponent } from './cat-form/cat-form-detail.component';
import { CatRoutingModule } from './cat.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CatComponent,
       CatFormComponent,
       CatFormDetailComponent
     ],
     imports: [
        CatRoutingModule,
        SharedModule
     ],
     providers: [
        CatService
     ]
})
export class CatModule{}