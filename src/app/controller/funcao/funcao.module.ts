import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { FuncaoComponent } from './funcao.component';
import { FuncaoService } from './funcao.service';
import { FuncaoCadastrarComponent } from './funcao-cadastrar/funcao-cadastrar.component';
import { FuncaoRoutingModule } from './funcao.routing.module';
//import { FuncaoEditarComponent } from './funcao-editar/funcao-editar.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       FuncaoComponent,
       FuncaoCadastrarComponent
//       FuncaoEditarComponent
     ],
     imports: [
        FuncaoRoutingModule,
        SharedModule
     ],
     providers: [
        FuncaoService
     ]
})
export class FuncaoModule{}