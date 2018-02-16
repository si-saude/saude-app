import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TarefaService } from './tarefa.service';
import { TarefaFormComponent } from './tarefa-form/tarefa-form.component';
import { TarefaRoutingModule } from './tarefa.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       TarefaFormComponent
     ],
     imports: [
        TarefaRoutingModule,
        SharedModule
     ],
     providers: [
        TarefaService
     ]
})
export class TarefaModule{}