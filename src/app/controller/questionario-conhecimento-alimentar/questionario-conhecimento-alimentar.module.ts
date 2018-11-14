import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuestionarioConhecimentoAlimentarComponent } from './questionario-conhecimento-alimentar.component';
import { QuestionarioConhecimentoAlimentarService } from './questionario-conhecimento-alimentar.service';
import { QuestionarioConhecimentoAlimentarFormComponent } from './questionario-conhecimento-alimentar-form/questionario-conhecimento-alimentar-form.component';
import { QuestionarioConhecimentoAlimentarFormDetailComponent } from './questionario-conhecimento-alimentar-form/questionario-conhecimento-alimentar-form-detail.component';
import { QuestionarioConhecimentoAlimentarRoutingModule } from './questionario-conhecimento-alimentar.routing.module';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';

@NgModule({
    declarations: [
       QuestionarioConhecimentoAlimentarComponent,
       QuestionarioConhecimentoAlimentarFormComponent,
       QuestionarioConhecimentoAlimentarFormDetailComponent
     ],
     imports: [
        QuestionarioConhecimentoAlimentarRoutingModule,
        SharedModule,
        PipesModule
     ],
     providers: [
        QuestionarioConhecimentoAlimentarService
     ]
})
export class QuestionarioConhecimentoAlimentarModule{}