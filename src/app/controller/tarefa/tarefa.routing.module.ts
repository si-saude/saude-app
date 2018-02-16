import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarefaFormComponent } from './tarefa-form/tarefa-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const tarefaRoutes: Routes = [
    { path: '', component: TarefaFormComponent,
        canDeactivate: [CanDeactivateGuard]},];

@NgModule({
    imports: [RouterModule.forChild(tarefaRoutes)],
    exports: [RouterModule]
})
export class TarefaRoutingModule {}