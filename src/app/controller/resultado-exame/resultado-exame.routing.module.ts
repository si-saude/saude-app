import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoExameComponent } from './resultado-exame.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';

const resultadoExameRoutes: Routes = [
    { path: '', component: ResultadoExameComponent }
];

@NgModule({
    imports: [RouterModule.forChild(resultadoExameRoutes)],
    exports: [RouterModule]
})
export class ResultadoExameRoutingModule {}