import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaPeriodicoComponent } from './agenda-periodico.component';

const agendaRoutes: Routes = [
    { path: '', component: AgendaPeriodicoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(agendaRoutes)],
    exports: [RouterModule]
})
export class AgendaPeriodicoRoutingModule {}