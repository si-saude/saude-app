import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { GerenciaComponent } from './gerencia.component';
import { GerenciaService } from './gerencia.service';
import { GerenciaRoutingModule } from './gerencia.routing.module';
import { GerenciaFormComponent } from './gerencia-form/gerencia-form.component';
//import { GerenciaCadastrarComponent } from './gerencia-cadastrar/gerencia-cadastrar.component';
//import { GerenciaEditarComponent } from './gerencia-editar/gerencia-editar.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       GerenciaComponent,
       GerenciaFormComponent
//       GerenciaCadastrarComponent,
//       GerenciaEditarComponent
     ],
     imports: [
        GerenciaRoutingModule,
        SharedModule
     ],
     providers: [
        GerenciaService
     ]
})
export class GerenciaModule{}