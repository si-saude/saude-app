import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargoComponent } from './cargo.component';
import { CargoCadastrarComponent } from './cargo-cadastrar/cargo-cadastrar.component';
import { CargoEditarComponent } from './cargo-editar/cargo-editar.component';
    
const cargoRoutes: Routes = [
    { path: 'cargo', component: CargoComponent },
    { path: 'cargo/cadastrar', component: CargoCadastrarComponent },
    { path: 'cargo/editar/:id', component: CargoEditarComponent }
];

@NgModule({
    imports: [RouterModule.forChild(cargoRoutes)],
    exports: [RouterModule]
})
export class CargoRoutingModule {}