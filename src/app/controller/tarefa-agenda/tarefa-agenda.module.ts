import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TarefaService } from './../tarefa/tarefa.service';
import { TarefaAgendaComponent } from './tarefa-agenda.component';
import { TarefaAgendaFormComponent } from './tarefa-agenda/tarefa-agenda-form.component';
import { TarefaAgendaRoutingModule } from './tarefa-agenda.routing.module';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';

@NgModule({
    declarations: [
       TarefaAgendaFormComponent,
       TarefaAgendaComponent
     ],
     imports: [
        TarefaAgendaRoutingModule,
        PipesModule,
        SharedModule
     ],
     providers: [
        TarefaService
     ]
})
export class TarefaAgendaModule{}