import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PossivelDanoSaudeComponent } from './possivel-dano-saude.component';
import { PossivelDanoSaudeService } from './possivel-dano-saude.service';
import { PossivelDanoSaudeFormComponent } from './possivel-dano-saude-form/possivel-dano-saude-form.component';
import { PossivelDanoSaudeFormDetailComponent } from './possivel-dano-saude-form/possivel-dano-saude-form-detail.component';
import { PossivelDanoSaudeRoutingModule } from './possivel-dano-saude.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       PossivelDanoSaudeComponent,
       PossivelDanoSaudeFormComponent,
       PossivelDanoSaudeFormDetailComponent
     ],
     imports: [
        PossivelDanoSaudeRoutingModule,
        SharedModule
     ],
     providers: [
        PossivelDanoSaudeService
     ]
})
export class PossivelDanoSaudeModule{}