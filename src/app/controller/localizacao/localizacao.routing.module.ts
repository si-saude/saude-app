import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalizacaoComponent } from './localizacao.component';
import { LocalizacaoCadastrarComponent } from './localizacao-cadastrar/localizacao-cadastrar.component';
import { LocalizacaoEditarComponent } from './localizacao-editar/localizacao-editar.component';

const localizacaoRoutes: Routes = [
    { path: 'localizacao', component: LocalizacaoComponent },
    { path: 'localizacao/cadastrar', component: LocalizacaoCadastrarComponent },
    { path: 'localizacao/editar/:id', component: LocalizacaoEditarComponent }
];

@NgModule({
    imports: [RouterModule.forChild(localizacaoRoutes)],
    exports: [RouterModule]
})
export class LocalizacaoRoutingModule {}