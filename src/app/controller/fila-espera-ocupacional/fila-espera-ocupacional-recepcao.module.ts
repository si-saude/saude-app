import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { QuadroAtendimentoComponent } from './quadro-atendimento/quadro-atendimento.component';
import { CheckInRecepcaoComponent } from './check-in-recepcao/check-in-recepcao.component';
import { CheckOutRecepcaoComponent } from './check-out-recepcao/check-out-recepcao.component';
import { FilaEsperaOcupacionalService } from './fila-espera-ocupacional.service';
import { FilaEsperaOcupacionalRecepcaoRoutingModule } from './fila-espera-ocupacional-recepcao.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CheckInRecepcaoComponent,
       CheckOutRecepcaoComponent,
       QuadroAtendimentoComponent
     ],
     imports: [
        FilaEsperaOcupacionalRecepcaoRoutingModule,
        SharedModule
     ],
     providers: [
        FilaEsperaOcupacionalService
     ]
})
export class FilaEsperaOcupacionalRecepcaoModule{}