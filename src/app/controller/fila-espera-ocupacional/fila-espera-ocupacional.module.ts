import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { MyDatePickerModule } from 'mydatepicker';
import { Ng2InputMaskModule } from 'ng2-input-mask';

import { CheckInComponent } from './check-in/check-in.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { QuadroAtendimentoComponent } from './quadro-atendimento/quadro-atendimento.component';
import { DeclaracaoComparecimentoComponent } from './declaracao-comparecimento/declaracao-comparecimento.component';
import { FilaComponent } from './fila/fila.component';
import { FilaEsperaOcupacionalService } from './fila-espera-ocupacional.service';
import { FilaEsperaOcupacionalRoutingModule } from './fila-espera-ocupacional.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CheckInComponent,
       CheckOutComponent,
       QuadroAtendimentoComponent,
       DeclaracaoComparecimentoComponent,
       FilaComponent
     ],
     imports: [
        FilaEsperaOcupacionalRoutingModule,
        MyDatePickerModule,
        Ng2InputMaskModule,
        SharedModule
     ],
     providers: [
        FilaEsperaOcupacionalService
     ]
})
export class FilaEsperaOcupacionalModule{}