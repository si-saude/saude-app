import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { LocalizacaoComponent } from './localizacao.component';
import { LocalizacaoService } from './localizacao.service';
import { LocalizacaoRoutingModule } from './localizacao.routing.module';
import { SharedModule } from './../shared.module';
import { LocalizacaoFormComponent } from './localizacao-form/localizacao-form.component';

@NgModule({
    declarations: [
       LocalizacaoComponent,
     LocalizacaoFormComponent,
     ],
     imports: [
        SharedModule,
        LocalizacaoRoutingModule
     ],
     providers: [
        LocalizacaoService
     ] 
})
export class LocalizacaoModule{}