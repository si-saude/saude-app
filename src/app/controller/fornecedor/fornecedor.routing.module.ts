import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorComponent } from './fornecedor.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
    
const fornecedor: Routes = [
    { path: 'fornecedor', component: FornecedorComponent },
    { path: 'fornecedor/cadastrar', component: FornecedorFormComponent},
    { path: 'fornecedor/editar/:id', component: FornecedorFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(fornecedor)],
    exports: [RouterModule]
})
export class FornecedorRoutingModule {}