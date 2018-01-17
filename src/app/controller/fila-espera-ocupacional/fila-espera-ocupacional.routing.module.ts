import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckInComponent } from './check-in/check-in.component';
import { FilaComponent } from './fila/fila.component';
    
const filaEsperaOcupacional: Routes = [
    { path: 'check-in', component: CheckInComponent },
    { path: 'fila', component: FilaComponent }
];

@NgModule({
    imports: [RouterModule.forChild(filaEsperaOcupacional)],
    exports: [RouterModule]
})
export class FilaEsperaOcupacionalRoutingModule {}