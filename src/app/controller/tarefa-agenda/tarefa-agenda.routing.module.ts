import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarefaAgendaComponent } from './tarefa-agenda.component';
import {TarefaAgendaFormComponent} from './tarefa-agenda/tarefa-agenda-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
const tarefaAgendaRoutes: Routes = [
    { path: '', component: TarefaAgendaComponent},
    { path: 'editar/:id', component: TarefaAgendaFormComponent,
        canDeactivate: [CanDeactivateGuard]}
    ]

@NgModule({
    imports: [RouterModule.forChild(tarefaAgendaRoutes)],
    exports: [RouterModule]
})
export class TarefaAgendaRoutingModule {}