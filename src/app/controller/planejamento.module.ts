import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalDiagnosticoComponent } from './../includes/modal-diagnostico/modal-diagnostico.component';
import { ModalIntervencaoComponent } from './../includes/modal-intervencao/modal-intervencao.component';
import { ModalEquipeComponent } from './../includes/modal-equipe/modal-equipe.component';
import { PlanejamentoComponent } from './../includes/planejamento/planejamento.component';
import { PipesModule } from './pipes.module';
import { DataTableModule } from "angular2-datatable";

@NgModule({
  declarations: [
    ModalDiagnosticoComponent,
    ModalIntervencaoComponent,
    ModalEquipeComponent,
    PlanejamentoComponent
  ],
  imports: [
    PipesModule,
    MaterializeModule,
    FormsModule,
    DataTableModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ModalDiagnosticoComponent,
    ModalIntervencaoComponent,
    ModalEquipeComponent,
    PlanejamentoComponent
  ]
})
export class PlanejamentoModule { }