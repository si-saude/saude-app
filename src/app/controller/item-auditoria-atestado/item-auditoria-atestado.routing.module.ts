import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemAuditoriaAtestadoComponent } from './item-auditoria-atestado.component';
import { ItemAuditoriaAtestadoFormComponent } from './item-auditoria-atestado-form/item-auditoria-atestado-form.component';
import { ItemAuditoriaAtestadoFormDetailComponent } from './item-auditoria-atestado-form/item-auditoria-atestado-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
 
const itemAuditoriaAtestadoRoutes: Routes = [
    { path: '', component: ItemAuditoriaAtestadoComponent },
    { path: 'cadastrar', component: ItemAuditoriaAtestadoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: ItemAuditoriaAtestadoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: ItemAuditoriaAtestadoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(itemAuditoriaAtestadoRoutes)],
    exports: [RouterModule]
})
export class ItemAuditoriaAtestadoRoutingModule {}