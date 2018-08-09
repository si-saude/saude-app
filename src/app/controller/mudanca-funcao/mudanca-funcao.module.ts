import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MudancaFuncaoComponent } from './mudanca-funcao.component';
import { MudancaFuncaoService } from './mudanca-funcao.service';
import { MudancaFuncaoFormComponent } from './mudanca-funcao-form/mudanca-funcao-form.component';
import { MudancaFuncaoFormDetailComponent } from './mudanca-funcao-form/mudanca-funcao-form-detail.component';
import { MudancaFuncaoRoutingModule } from './mudanca-funcao.routing.module';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';

@NgModule({
    declarations: [
       MudancaFuncaoComponent,
       MudancaFuncaoFormComponent,
       MudancaFuncaoFormDetailComponent
     ],
     imports: [
        MudancaFuncaoRoutingModule,
        PipesModule,
        SharedModule
     ],
     providers: [
        MudancaFuncaoService
     ]
})
export class MudancaFuncaoModule{}