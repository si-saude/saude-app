import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuarioComponent } from './usuario.component';
import { UsuarioService } from './usuario.service';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioRoutingModule } from './usuario.routing.module';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       UsuarioComponent,
       UsuarioFormComponent
     ],
     imports: [
        UsuarioRoutingModule,
        SharedModule
     ],
     providers: [
        UsuarioService
     ]
})
export class UsuarioModule{}