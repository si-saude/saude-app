import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";

import { ModalProfissionalComponent } from './../includes/modal-profissional/modal-profissional.component';
import { PipesModule } from './pipes.module';

@NgModule( {
    imports: [
        MaterializeModule,
        FormsModule,
        CommonModule,
        RouterModule,
        PipesModule,
        DataTableModule
    ],
    declarations: [
        ModalProfissionalComponent
    ],
    exports: [
        ModalProfissionalComponent
    ]
} )
export class ModalProfissionalModule { }