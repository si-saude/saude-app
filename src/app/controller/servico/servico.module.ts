import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicoComponent } from './servico.component';
import { ServicoService } from './servico.service';
import { ServicoFormComponent } from './servico-form/servico-form.component';
import { ServicoFormDetailComponent } from './servico-form/servico-form-detail.component';
import { ServicoRoutingModule } from './servico.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       ServicoComponent,
       ServicoFormComponent,
       ServicoFormDetailComponent
     ],
     imports: [
        ServicoRoutingModule,
        SharedModule
     ],
     providers: [
        ServicoService
     ]
})
export class ServicoModule{}