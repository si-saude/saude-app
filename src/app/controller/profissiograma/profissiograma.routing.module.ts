import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfissiogramaComponent } from './profissiograma.component';
import { ProfissiogramaFormComponent } from './profissiograma-form/profissiograma-form.component';
    
const profissiogramaRoutes: Routes = [
    { path: 'profissiograma', component: ProfissiogramaComponent },
    { path: 'profissiograma/cadastrar', component: ProfissiogramaFormComponent},
    { path: 'profissiograma/editar/:id', component: ProfissiogramaFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(profissiogramaRoutes)],
    exports: [RouterModule]
})
export class ProfissiogramaRoutingModule {}