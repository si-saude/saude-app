import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlanoAlimentarComponent } from './plano-alimentar.component';
import { PlanoAlimentarService } from './plano-alimentar.service';
import { PlanoAlimentarFormComponent } from './plano-alimentar-form/plano-alimentar-form.component';
import { PlanoAlimentarFormDetailComponent } from './plano-alimentar-form/plano-alimentar-form-detail.component';
import { PlanoAlimentarRoutingModule } from './plano-alimentar.routing.module';
import { PlanoAlimentarRefeicaoComponent } from './../../includes/refeicao-plano/refeicao-plano.component';
import { ItemRefeicaoPlanoComponent } from './../../includes/item-refeicao-plano/item-refeicao-plano.component';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';
import { ModalAlimentoModule } from './../../includes/modal-alimento/modal-alimento.module';
import { ModalObservacaoModule } from './../../includes/modal-observacao/modal-observacao.module';
import { NumberMaskDirectiveModule } from '../../directives/number-mask-directive/number-mask-directive.module';

@NgModule({
    declarations: [
       PlanoAlimentarRefeicaoComponent,
       PlanoAlimentarComponent,
       PlanoAlimentarFormComponent,
       PlanoAlimentarFormDetailComponent,
       ItemRefeicaoPlanoComponent
     ],
     imports: [
        PlanoAlimentarRoutingModule,
        SharedModule,
        PipesModule,
        ModalAlimentoModule,
        ModalObservacaoModule,
        NumberMaskDirectiveModule
     ],
     providers: [
        PlanoAlimentarService
     ]
})
export class PlanoAlimentarModule{}