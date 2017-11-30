import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstalacaoComponent } from './instalacao.component';
import { InstalacaoFormComponent } from './instalacao-form/instalacao-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
 
const instalacaoRoutes: Routes = [
    { path: '', component: InstalacaoComponent },
    { path: 'cadastrar', component: InstalacaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: InstalacaoFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(instalacaoRoutes)],
    exports: [RouterModule]
})
export class InstalacaoRoutingModule {}