import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GheeComponent } from './ghee.component';
import { GheeFormComponent } from './ghee-form/ghee-form.component';
    
const gheeRoutes: Routes = [
    { path: 'ghee', component: GheeComponent },
    { path: 'ghee/cadastrar', component: GheeFormComponent },
    { path: 'ghee/editar/:id', component: GheeFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(gheeRoutes)],
    exports: [RouterModule]
})
export class GheeRoutingModule {}