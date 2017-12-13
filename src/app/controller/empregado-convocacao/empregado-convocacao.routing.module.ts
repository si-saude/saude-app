import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpregadoConvocacaoComponent } from './empregado-convocacao.component';
import { EmpregadoConvocacaoFormComponent } from './empregado-convocacao-form/empregado-convocacao-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const empregadoConvocacaoRoutes: Routes = [
     { path: '', component: EmpregadoConvocacaoComponent },
     { path: 'editar/:id', component: EmpregadoConvocacaoFormComponent,
         canDeactivate: [CanDeactivateGuard]}
 ];

 @NgModule({
     imports: [RouterModule.forChild(empregadoConvocacaoRoutes)],
     exports: [RouterModule]
 })
 export class EmpregadoConvocacaoRoutingModule {}