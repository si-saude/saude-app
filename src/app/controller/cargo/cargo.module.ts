import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { CargoComponent } from './cargo.component';
import { CargoService } from './cargo.service';
import { CargoCadastrarComponent } from './cargo-cadastrar/cargo-cadastrar.component';
import { CargoRoutingModule } from './cargo.routing.module';
import { CargoEditarComponent } from './cargo-editar/cargo-editar.component';
import { SharedModule } from './../shared.module';

@NgModule({
    declarations: [
       CargoComponent,
       CargoCadastrarComponent,
       CargoEditarComponent
     ],
     imports: [
        CargoRoutingModule,
        SharedModule
     ],
     providers: [
        CargoService
     ]
})
export class CargoModule{}