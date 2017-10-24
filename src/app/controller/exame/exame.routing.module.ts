import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExameComponent } from './exame.component';
import { ExameFormComponent } from './exame-form/exame-form.component';
    
const exame: Routes = [
    { path: 'exame', component: ExameComponent },
    { path: 'exame/cadastrar', component: ExameFormComponent},
    { path: 'exame/editar/:id', component: ExameFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(exame)],
    exports: [RouterModule]
})
export class ExameRoutingModule {}