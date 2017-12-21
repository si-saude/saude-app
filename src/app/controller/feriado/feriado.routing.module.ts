import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeriadoComponent } from './feriado.component';
import { FeriadoFormComponent } from './feriado-form/feriado-form.component';
import { FeriadoFormDetailComponent } from './feriado-form/feriado-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const feriado: Routes = [
    { path: '', component: FeriadoComponent },
    { path: 'cadastrar', component: FeriadoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: FeriadoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'detalhe/:id', component: FeriadoFormDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(feriado)],
    exports: [RouterModule]
})
export class FeriadoRoutingModule {}