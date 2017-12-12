import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorComponent } from './fornecedor.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorFormDetailComponent } from './fornecedor-form/fornecedor-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
    
const fornecedor: Routes = [
    { path: '', component: FornecedorComponent },
    { path: 'cadastrar', component: FornecedorFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: FornecedorFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: FornecedorFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(fornecedor)],
    exports: [RouterModule]
})
export class FornecedorRoutingModule {}