import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FuncaoComponent } from './funcao.component';
import { FuncaoService } from './funcao.service';
import { FuncaoFormComponent } from './funcao-form/funcao-form.component';
import { FuncaoFormDetailComponent } from './funcao-form/funcao-form-detail.component';
import { FuncaoRoutingModule } from './funcao.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       FuncaoComponent,
       FuncaoFormComponent,
       FuncaoFormDetailComponent
     ],
     imports: [
        FuncaoRoutingModule,
        SharedModule
     ],
     providers: [
        FuncaoService
     ]
})
export class FuncaoModule{}