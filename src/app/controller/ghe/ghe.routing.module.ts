import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GheComponent } from './ghe.component';
import { GheFormComponent } from './ghe-form/ghe-form.component';
    
const gheRoutes: Routes = [
    { path: 'ghe', component: GheComponent },
    { path: 'ghe/cadastrar', component: GheFormComponent },
    { path: 'ghe/editar/:id', component: GheFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(gheRoutes)],
    exports: [RouterModule]
})
export class GheRoutingModule {}