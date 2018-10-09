import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { ClassificacaoGravidadeComponent } from './classificacao-gravidade.component';
import { ClassificacaoGravidadeService } from './classificacao-gravidade.service';
import { ClassificacaoGravidadeRoutingModule } from './classificacao-gravidade.routing.module';
import { ClassificacaoGravidadeFormComponent } from './classificacao-gravidade-form/classificacao-gravidade-form.component';
import { ClassificacaoGravidadeFormDetailComponent } from './classificacao-gravidade-form/classificacao-gravidade-form-detail.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       ClassificacaoGravidadeComponent,
       ClassificacaoGravidadeFormComponent,
       ClassificacaoGravidadeFormDetailComponent
     ],
     imports: [
        ClassificacaoGravidadeRoutingModule,
        SharedModule
     ],
     providers: [
        ClassificacaoGravidadeService
     ]
})
export class ClassificacaoGravidadeModule{}