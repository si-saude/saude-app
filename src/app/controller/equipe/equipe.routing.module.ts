import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipeComponent } from './equipe.component';
import { EquipeFormComponent } from './equipe-form/equipe-form.component';
//import { EquipeCadastrarComponent } from './equipe-cadastrar/equipe-cadastrar.component';
//import { EquipeEditarComponent } from './equipe-editar/equipe-editar.component';

const equipeRoutes: Routes = [
    { path: 'equipe', component: EquipeComponent },
    { path: 'equipe/cadastrar', component: EquipeFormComponent },
    { path: 'equipe/editar/:id', component: EquipeFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(equipeRoutes)],
    exports: [RouterModule]
})
export class EquipeRoutingModule {}