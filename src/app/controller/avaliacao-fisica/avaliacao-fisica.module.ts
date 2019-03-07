import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AvaliacaoFisicaComponent } from './../avaliacao-fisica/avaliacao-fisica.component';
import { AvaliacaoFisicaService } from './../avaliacao-fisica/avaliacao-fisica.service';
import { AvaliacaoFisicaRoutingModule } from './../avaliacao-fisica/avaliacao-fisica.routing.module';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';

@NgModule({
    declarations: [
       AvaliacaoFisicaComponent
     ],
     imports: [
        AvaliacaoFisicaRoutingModule,
        SharedModule,
        PipesModule
     ],
     providers: [
        AvaliacaoFisicaService
     ]
})
export class AvaliacaoFisicaModule{}