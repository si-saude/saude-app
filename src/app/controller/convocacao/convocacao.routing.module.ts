import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvocacaoComponent } from './convocacao.component';
import { ConvocacaoFormComponent } from './convocacao-form/convocacao-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const convocacaoRoutes: Routes = [
    { path: '', component: ConvocacaoComponent },
    { path: 'cadastrar', component: ConvocacaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: ConvocacaoFormComponent,
        canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(convocacaoRoutes)],
    exports: [RouterModule]
})
export class ConvocacaoRoutingModule {}