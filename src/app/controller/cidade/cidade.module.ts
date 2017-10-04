import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { CidadeComponent } from './cidade.component';
import { CidadeService } from './cidade.service';
import { CidadeCadastrarComponent } from './cidade-cadastrar/cidade-cadastrar.component';
import { CidadeRoutingModule } from './cidade.routing.module';
import { CidadeEditarComponent } from './cidade-editar/cidade-editar.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CidadeComponent,
       CidadeCadastrarComponent,
       CidadeEditarComponent
     ],
     imports: [
        CidadeRoutingModule,
        SharedModule
     ],
     providers: [
        CidadeService
     ]
})
export class CidadeModule{}