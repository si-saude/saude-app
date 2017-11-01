import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacinaComponent } from './vacina.component';
import { VacinaFormComponent } from './vacina-form/vacina-form.component';
    
const vacinaRoutes: Routes = [
    { path: 'vacina', component: VacinaComponent },
    { path: 'vacina/cadastrar', component: VacinaFormComponent },
    { path: 'vacina/editar/:id', component: VacinaFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(vacinaRoutes)],
    exports: [RouterModule]
})
export class VacinaRoutingModule {}