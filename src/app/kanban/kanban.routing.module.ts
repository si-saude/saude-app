import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KanbanComponent } from './kanban.component';

const kanbanRoutes: Routes = [
    { path: '', component: KanbanComponent}
];

@NgModule({
    imports: [RouterModule.forChild(kanbanRoutes)],
    exports: [RouterModule]
})
export class KanbanRoutingModule {}