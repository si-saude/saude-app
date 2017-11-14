import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvocacaoComponent } from './convocacao.component';
import { ConvocacaoFormComponent } from './convocacao-form/convocacao-form.component';
    
const convocacaoRoutes: Routes = [
    { path: 'convocacao', component: ConvocacaoComponent },
    { path: 'convocacao/cadastrar', component: ConvocacaoFormComponent },
    { path: 'convocacao/editar/:id', component: ConvocacaoFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(convocacaoRoutes)],
    exports: [RouterModule]
})
export class ConvocacaoRoutingModule {}