import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { EquipeComponent } from './equipe.component';
import { EquipeService } from './equipe.service';
import { EquipeRoutingModule } from './equipe.routing.module';
import { SharedModule } from './../shared.module';
import { EquipeCadastrarComponent } from './equipe-cadastrar/equipe-cadastrar.component';
import { EquipeEditarComponent } from './equipe-editar/equipe-editar.component';
//import { LocalizacaoCadastrarComponent } from './localizacao-cadastrar/localizacao-cadastrar.component';
//import { LocalizacaoEditarComponent } from './localizacao-editar/localizacao-editar.component';

@NgModule({
    declarations: [
       EquipeComponent,
       EquipeCadastrarComponent,
       EquipeEditarComponent
//       LocalizacaoEditarComponent
     ],
     imports: [
        SharedModule,
        EquipeRoutingModule
     ],
     providers: [
        EquipeService
     ] 
})
export class EquipeModule{}