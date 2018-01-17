import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { MyDatePickerModule } from 'mydatepicker';

import { CheckInComponent } from './check-in/check-in.component';
import { FilaComponent } from './fila/fila.component';
import { FilaEsperaOcupacionalService } from './fila-espera-ocupacional.service';
import { FilaEsperaOcupacionalRoutingModule } from './fila-espera-ocupacional.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CheckInComponent,
       FilaComponent
     ],
     imports: [
        FilaEsperaOcupacionalRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        FilaEsperaOcupacionalService
     ]
})
export class FilaEsperaOcupacionalModule{}