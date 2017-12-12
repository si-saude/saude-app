import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CidadeComponent } from './cidade.component';
import { CidadeFormComponent } from './cidade-form/cidade-form.component';
import { CidadeFormDetailComponent } from './cidade-form/cidade-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const cidadeRoutes: Routes = [
    { path: '', component: CidadeComponent },
    { path: 'cadastrar', component: CidadeFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: CidadeFormComponent,
        canDeactivate: [CanDeactivateGuard] },
    { path: 'detalhe/:id', component: CidadeFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(cidadeRoutes)],
    exports: [RouterModule]
})
export class CidadeRoutingModule {}