import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncaoComponent } from './funcao.component';
import { FuncaoFormComponent } from './funcao-form/funcao-form.component';
    
const funcaoRoutes: Routes = [
    { path: 'funcao', component: FuncaoComponent },
    { path: 'funcao/cadastrar', component: FuncaoFormComponent },
    { path: 'funcao/editar/:id', component: FuncaoFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(funcaoRoutes)],
    exports: [RouterModule]
})
export class FuncaoRoutingModule {}