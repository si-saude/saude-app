import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { PerfilComponent } from './perfil.component';
import { PerfilService } from './perfil.service';
import { PerfilCadastrarComponent } from './perfil-cadastrar/perfil-cadastrar.component';
import { PerfilRoutingModule } from './perfil.routing.module';
import { PerfilEditarComponent } from './perfil-editar/perfil-editar.component';
import { MensagemFormComponent } from './../includes/mensagem-form/mensagem-form.component';

@NgModule({
    declarations: [
       PerfilComponent,
       PerfilCadastrarComponent,
       PerfilEditarComponent,
       MensagemFormComponent
     ],
     imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MaterializeModule,
        ReactiveFormsModule,
        PerfilRoutingModule
     ],
     providers: [
        PerfilService
     ]  
})
export class PerfilModule{}