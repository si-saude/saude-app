import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncaoComponent } from './funcao.component';
import { FuncaoFormComponent } from './funcao-form/funcao-form.component';
import { FuncaoFormDetailComponent } from './funcao-form/funcao-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
  
const funcaoRoutes: Routes = [
    { path: '', component: FuncaoComponent },
    { path: 'cadastrar', component: FuncaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: FuncaoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: FuncaoFormDetailComponent}    
];

@NgModule({
    imports: [RouterModule.forChild(funcaoRoutes)],
    exports: [RouterModule]
})
export class FuncaoRoutingModule {}