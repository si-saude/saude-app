import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { Ng2InputMaskModule } from 'ng2-input-mask';

import { CatComponent } from './cat.component';
import { CatService } from './cat.service';
import { CatFormComponent } from './cat-form/cat-form.component';
import { CatFormDetailComponent } from './cat-form/cat-form-detail.component';
import { CatRoutingModule } from './cat.routing.module';
import { SharedModule } from './../shared.module';
import { PlanejamentoModule } from './../planejamento.module';
import { PipesModule } from './../pipes.module';
import { ModalExameModule } from './../../includes/modal-exame/modal-exame.module';
import { ModalConfirmModule } from './../../includes/modal-confirm/modal-confirm.module';
import { NumberMaskDirectiveModule } from '../../directives/number-mask-directive/number-mask-directive.module';

@NgModule({
    declarations: [
       CatComponent,
       CatFormComponent,
       CatFormDetailComponent
     ],
     imports: [
        MyDatePickerModule,
        CatRoutingModule,
        SharedModule,
        Ng2InputMaskModule,
        PlanejamentoModule,
        PipesModule,
        ModalExameModule,
        ModalConfirmModule,
        NumberMaskDirectiveModule
     ],
     providers: [
        CatService
     ]
})
export class CatModule{}