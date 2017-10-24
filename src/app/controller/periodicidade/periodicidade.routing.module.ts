import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeriodicidadeComponent } from './periodicidade.component';
import { PeriodicidadeFormComponent } from './periodicidade-form/periodicidade-form.component';
    
const profissionalSaudeRoutes: Routes = [
    { path: 'periodicidade', component: PeriodicidadeComponent },
    { path: 'periodicidade/cadastrar', component: PeriodicidadeFormComponent},
    { path: 'periodicidade/editar/:id', component: PeriodicidadeFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(profissionalSaudeRoutes)],
    exports: [RouterModule]
})
export class PeriodicidadeRoutingModule {}