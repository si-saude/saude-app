import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpregadoComponent } from './empregado.component';
import { EmpregadoFormComponent } from './empregado-form/empregado-form.component';
    
const empregadoRoutes: Routes = [
    { path: 'empregado', component: EmpregadoComponent },
    { path: 'empregado/cadastrar', component: EmpregadoFormComponent},
    { path: 'empregado/editar/:id', component: EmpregadoFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(empregadoRoutes)],
    exports: [RouterModule]
})
export class EmpregadoRoutingModule {}