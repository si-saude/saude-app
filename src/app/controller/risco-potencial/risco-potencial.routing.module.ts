import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiscoPotencialComponent } from './risco-potencial.component';
//import { RiscoPotencialFormComponent } from './risco-potencial-form/risco-potencial-form.component';
//import { RiscoPotencialFormDetailComponent } from './risco-potencial-form/risco-potencial-form-detail.component';
//import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
//import { RiscoPotencialGuard } from './../../guards/guards-child/risco-potencial.guard';

const riscoPotencialRoutes: Routes = [
    { path: '', component: RiscoPotencialComponent}
//    { path: 'cadastrar', component: RiscoPotencialFormComponent,
//        canDeactivate: [CanDeactivateGuard]},
//    { path: 'editar/:id', component: RiscoPotencialFormComponent,
//        canDeactivate: [CanDeactivateGuard]},
//    { path: 'detalhe/:id', component: RiscoPotencialFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(riscoPotencialRoutes)],
    exports: [RouterModule]
})
export class RiscoPotencialRoutingModule {}