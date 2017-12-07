import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargoComponent } from './cargo.component';
import { CargoFormComponent } from './cargo-form/cargo-form.component';
import { CargoFormDetailComponent } from './cargo-form/cargo-form-detail.component';
import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
    
const cargoRoutes: Routes = [
    { path: '', component: CargoComponent },
    { path: 'cadastrar', component: CargoFormComponent,
        canDeactivate: [CanDeactivateGuard]},
    { path: 'editar/:id', component: CargoFormComponent,
        canDeactivate: [CanDeactivateGuard] },
    { path: 'detalhe/:id', component: CargoFormDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(cargoRoutes)],
    exports: [RouterModule]
})
export class CargoRoutingModule {}