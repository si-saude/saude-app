import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { PerguntaFichaColetaComponent } from './pergunta-ficha-coleta.component';
import { PerguntaFichaColetaService } from './pergunta-ficha-coleta.service';
import { PerguntaFichaColetaRoutingModule } from './pergunta-ficha-coleta.routing.module';
import { PerguntaFichaColetaFormComponent } from './pergunta-ficha-coleta-form/pergunta-ficha-coleta-form.component';
import { PerguntaFichaColetaFormDetailComponent } from './pergunta-ficha-coleta-form/pergunta-ficha-coleta-form-detail.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       PerguntaFichaColetaComponent,
       PerguntaFichaColetaFormComponent,
       PerguntaFichaColetaFormDetailComponent
     ],
     imports: [
        PerguntaFichaColetaRoutingModule,
        SharedModule
     ],
     providers: [
        PerguntaFichaColetaService
     ]
})
export class PerguntaFichaColetaModule{}