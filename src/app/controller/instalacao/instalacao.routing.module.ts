import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstalacaoComponent } from './instalacao.component';
import { InstalacaoFormComponent } from './instalacao-form/instalacao-form.component';
    
const instalacaoRoutes: Routes = [
    { path: 'instalacao', component: InstalacaoComponent },
    { path: 'instalacao/cadastrar', component: InstalacaoFormComponent},
    { path: 'instalacao/editar/:id', component: InstalacaoFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(instalacaoRoutes)],
    exports: [RouterModule]
})
export class InstalacaoRoutingModule {}