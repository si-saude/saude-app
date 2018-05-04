import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home.component';
import { NotificacaoService } from './../controller/notificacao/notificacao.service';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from './../controller/shared.module';

@NgModule({
    declarations: [
       HomeComponent
     ],
     imports: [
        HomeRoutingModule,
        SharedModule
     ],
     providers: [
        NotificacaoService
     ]
})
export class HomeModule{}