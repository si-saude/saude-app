import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExameComponent } from './exame.component';
import { ExameFormComponent } from './exame-form/exame-form.component';
import { ExameFormDetailComponent } from './exame-form/exame-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const exame: Routes = [
    { path: '', component: ExameComponent },
    { path: 'cadastrar', component: ExameFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: ExameFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: ExameFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(exame)],
    exports: [RouterModule]
})
export class ExameRoutingModule {}