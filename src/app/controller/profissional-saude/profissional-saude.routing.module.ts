import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfissionalSaudeComponent } from './profissional-saude.component';
import { ProfissionalSaudeCadastrarComponent } from './profissional-saude-cadastrar/profissional-saude-cadastrar.component';
import { ProfissionalSaudeEditarComponent } from './profissional-saude-editar/profissional-saude-editar.component';
    
const profissionalSaudeRoutes: Routes = [
    { path: 'profissional-saude', component: ProfissionalSaudeComponent },
    { path: 'profissional-saude/cadastrar', component: ProfissionalSaudeCadastrarComponent},
    { path: 'profissional-saude/editar/:id', component: ProfissionalSaudeEditarComponent }
];

@NgModule({
    imports: [RouterModule.forChild(profissionalSaudeRoutes)],
    exports: [RouterModule]
})
export class ProfissionalSaudeRoutingModule {}