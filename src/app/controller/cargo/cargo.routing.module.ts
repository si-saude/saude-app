import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargoComponent } from './cargo.component';
import { CargoFormComponent } from './cargo-form/cargo-form.component';
    
const cargoRoutes: Routes = [
    { path: 'cargo', component: CargoComponent },
    { path: 'cargo/cadastrar', component: CargoFormComponent },
    { path: 'cargo/editar/:id', component: CargoFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(cargoRoutes)],
    exports: [RouterModule]
})
export class CargoRoutingModule {}