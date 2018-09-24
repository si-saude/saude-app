import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AtestadoComponent } from './atestado.component';
import { AtestadoService } from './atestado.service';
import { AtestadoFormComponent } from './atestado-form/atestado-form.component';
import { AtestadoFormDetailComponent } from './atestado-form/atestado-form-detail.component';
import { AtestadoRoutingModule } from './atestado.routing.module';
import { ModalTarefaSimpleModule } from './../../includes/modal-tarefa-simple/modal-tarefa-simple.module';
import { ModalConfirmModule } from './../../includes/modal-confirm/modal-confirm.module';
import { ModalExameModule } from './../../includes/modal-exame/modal-exame.module';
import { PipesModule } from './../pipes.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       AtestadoComponent,
       AtestadoFormComponent,
       AtestadoFormDetailComponent
     ],
     imports: [
        ReactiveFormsModule,
        AtestadoRoutingModule,
        SharedModule,
        PipesModule,
        ModalTarefaSimpleModule,
        ModalExameModule,
        ModalConfirmModule
     ],
     providers: [
        AtestadoService
     ]
})
export class AtestadoModule{}