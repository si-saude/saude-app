import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckInRecepcaoComponent } from './check-in-recepcao/check-in-recepcao.component';
import { CheckOutRecepcaoComponent } from './check-out-recepcao/check-out-recepcao.component';
    
const filaEsperaOcupacionalRecepcao: Routes = [
    { path: 'check-in', component: CheckInRecepcaoComponent },
    { path: 'check-out', component: CheckOutRecepcaoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(filaEsperaOcupacionalRecepcao)],
    exports: [RouterModule]
})
export class FilaEsperaOcupacionalRecepcaoRoutingModule {}