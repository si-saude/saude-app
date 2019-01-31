import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecordatorioComponent } from './recordatorio.component';
import { RecordatorioService } from './recordatorio.service';
import { RecordatorioFormComponent } from './recordatorio-form/recordatorio-form.component';
import { RecordatorioFormDetailComponent } from './recordatorio-form/recordatorio-form-detail.component';
import { RecordatorioRoutingModule } from './recordatorio.routing.module';
import { RecordatorioRefeicaoComponent } from './../../includes/recordatorio-refeicao/recordatorio-refeicao.component';
import { ItemRefeicaoComponent } from './../../includes/item-refeicao/item-refeicao.component';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';
import { NumberMaskDirectiveModule } from '../../directives/number-mask-directive/number-mask-directive.module';

@NgModule({
    declarations: [
       RecordatorioRefeicaoComponent,
       RecordatorioComponent,
       RecordatorioFormComponent,
       RecordatorioFormDetailComponent,
       ItemRefeicaoComponent
     ],
     imports: [
        RecordatorioRoutingModule,
        SharedModule,
        PipesModule,
        NumberMaskDirectiveModule
     ],
     providers: [
        RecordatorioService
     ]
})
export class RecordatorioModule{}