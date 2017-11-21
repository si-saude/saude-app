import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalizacaoComponent } from './localizacao.component';
import { LocalizacaoFormComponent } from './localizacao-form/localizacao-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const localizacaoRoutes: Routes = [
    { path: '', component: LocalizacaoComponent },
    { path: 'cadastrar', component: LocalizacaoFormComponent },
    { path: 'editar/:id', component: LocalizacaoFormComponent,
        canDeactivate: [CanDeactivateGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(localizacaoRoutes)],
    exports: [RouterModule]
})
export class LocalizacaoRoutingModule {}