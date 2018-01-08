import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditoriaResultadoExameComponent } from './auditoria-resultado-exame.component';
import { AuditoriaResultadoExameFormComponent } from './auditoria-resultado-exame-form/auditoria-resultado-exame-form.component';
import { AuditoriaResultadoExameFormDetailComponent } from './auditoria-resultado-exame-form/auditoria-resultado-exame-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const auditoriaResultadoExameRoutes: Routes = [
     { path: '', component: AuditoriaResultadoExameComponent },
     { path: 'cadastrar', component: AuditoriaResultadoExameFormComponent,
         canDeactivate: [CanDeactivateGuard]},
     { path: 'editar/:id', component: AuditoriaResultadoExameFormComponent,
         canDeactivate: [CanDeactivateGuard]},
     { path: 'detalhe/:id', component: AuditoriaResultadoExameFormDetailComponent}
 ];

 @NgModule({
     imports: [RouterModule.forChild(auditoriaResultadoExameRoutes)],
     exports: [RouterModule]
 })
 export class AuditoriaResultadoExameRoutingModule {}