import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalizacaoComponent } from './localizacao.component';
import { LocalizacaoFormComponent } from './localizacao-form/localizacao-form.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { LocalizacaoFormDetailComponent } from './localizacao-form/localizacao-form-detail.component';

const localizacaoRoutes: Routes = [
    { path: '', component: LocalizacaoComponent },
    { path: 'cadastrar', component: LocalizacaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: LocalizacaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: LocalizacaoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(localizacaoRoutes)],
    exports: [RouterModule]
})
export class LocalizacaoRoutingModule {}