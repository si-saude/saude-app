import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { CursoComponent } from './curso.component';
import { CursoService } from './curso.service';
import { CursoCadastrarComponent } from './curso-cadastrar/curso-cadastrar.component';
import { CursoRoutingModule } from './curso.routing.module';
//import { CursoEditarComponent } from './curso-editar/curso-editar.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CursoComponent,
       CursoCadastrarComponent
//       FuncaoEditarComponent
     ],
     imports: [
        CursoRoutingModule,
        SharedModule
     ],
     providers: [
        CursoService
     ]
})
export class CursoModule{}