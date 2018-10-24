import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncludeSharedModule } from './../../controller/include-shared.module';
import { ModalExameModule } from './../modal-exame/modal-exame.module';
import { ModalConfirmModule } from './../modal-confirm/modal-confirm.module';

import { InformacaoAsoComponent } from './informacao-aso.component';

@NgModule({
  imports: [
    MaterializeModule,
    FormsModule,
    CommonModule,
    RouterModule,
    IncludeSharedModule,
    ModalExameModule,
    ModalConfirmModule
  ],
  declarations: [
    InformacaoAsoComponent
  ],
  exports: [
    InformacaoAsoComponent
  ]
})
export class InformacaoAsoModule { }