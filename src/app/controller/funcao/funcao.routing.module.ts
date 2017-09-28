import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncaoComponent } from './funcao.component';
import { FuncaoCadastrarComponent } from './funcao-cadastrar/funcao-cadastrar.component';
//import { FuncaoEditarComponent } from './funcao-editar/funcao-editar.component';
    
const funcaoRoutes: Routes = [
    { path: 'funcao', component: FuncaoComponent },
    { path: 'funcao/cadastrar', component: FuncaoCadastrarComponent }
//    { path: 'funcao/editar/:id', component: FuncaoEditarComponent }
];

@NgModule({
    imports: [RouterModule.forChild(funcaoRoutes)],
    exports: [RouterModule]
})
export class FuncaoRoutingModule {}