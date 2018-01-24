import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const resultadoExameRoutes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild(resultadoExameRoutes)],
    exports: [RouterModule]
})
export class ResultadoExameRoutingModule {}