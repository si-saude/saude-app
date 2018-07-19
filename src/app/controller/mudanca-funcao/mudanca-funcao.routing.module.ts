import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MudancaFuncaoComponent } from './mudanca-funcao.component';
import { MudancaFuncaoFormComponent } from './mudanca-funcao-form/mudanca-funcao-form.component';
import { MudancaFuncaoFormDetailComponent } from './mudanca-funcao-form/mudanca-funcao-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { MudancaFuncaoGuard } from './../../guards/guards-child/mudanca-funcao.guard';

const MudancaFuncaoRoutes: Routes = [
    { path: '', component: MudancaFuncaoComponent},
    { path: 'cadastrar', component: MudancaFuncaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: MudancaFuncaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: MudancaFuncaoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(MudancaFuncaoRoutes)],
    exports: [RouterModule]
})
export class MudancaFuncaoRoutingModule {}