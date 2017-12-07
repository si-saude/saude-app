import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RelatorioMedicoComponent } from './relatorio-medico.component';
import { RelatorioMedicoService } from './relatorio-medico.service';
import { RelatorioMedicoFormComponent } from './relatorio-medico-form/relatorio-medico-form.component';
import { RelatorioMedicoFormDetailComponent } from './relatorio-medico-form/relatorio-medico-form-detail.component';
import { RelatorioMedicoRoutingModule } from './relatorio-medico.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       RelatorioMedicoComponent,
       RelatorioMedicoFormComponent,
       RelatorioMedicoFormDetailComponent
     ],
     imports: [
        RelatorioMedicoRoutingModule,
        SharedModule
     ],
     providers: [
        RelatorioMedicoService
     ]
})
export class RelatorioMedicoModule{}