import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { ClassificacaoAfastamentoComponent } from './classificacao-afastamento.component';
import { ClassificacaoAfastamentoService } from './classificacao-afastamento.service';
import { ClassificacaoAfastamentoRoutingModule } from './classificacao-afastamento.routing.module';
import { ClassificacaoAfastamentoFormComponent } from './classificacao-afastamento-form/classificacao-afastamento-form.component';
import { ClassificacaoAfastamentoFormDetailComponent } from './classificacao-afastamento-form/classificacao-afastamento-form-detail.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       ClassificacaoAfastamentoComponent,
       ClassificacaoAfastamentoFormComponent,
       ClassificacaoAfastamentoFormDetailComponent
     ],
     imports: [
        ClassificacaoAfastamentoRoutingModule,
        SharedModule
     ],
     providers: [
        ClassificacaoAfastamentoService
     ]
})
export class ClassificacaoAfastamentoModule{}