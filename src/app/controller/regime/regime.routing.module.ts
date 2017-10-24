import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegimeComponent } from './regime.component';
import { RegimeFormComponent } from './regime-form/regime-form.component';
    
const regimeRoutes: Routes = [
    { path: 'regime', component: RegimeComponent },
    { path: 'regime/cadastrar', component: RegimeFormComponent },
    { path: 'regime/editar/:id', component: RegimeFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(regimeRoutes)],
    exports: [RouterModule]
})
export class RegimeRoutingModule {}