import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordatorioComponent } from './recordatorio.component';
import { RecordatorioFormComponent } from './recordatorio-form/recordatorio-form.component';
import { RecordatorioFormDetailComponent } from './recordatorio-form/recordatorio-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { RecordatorioGuard } from './../../guards/guards-child/recordatorio.guard';

const recordatorioRoutes: Routes = [
    { path: '', component: RecordatorioComponent},
    { path: 'cadastrar/:atendimento_id', component: RecordatorioFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: RecordatorioFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: RecordatorioFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(recordatorioRoutes)],
    exports: [RouterModule]
})
export class RecordatorioRoutingModule {}