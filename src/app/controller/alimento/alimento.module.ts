import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlimentoComponent } from './../alimento/alimento.component';
import { AlimentoService } from './../alimento/alimento.service';
import { AlimentoFormComponent } from './../alimento/alimento-form/alimento-form.component';
import { AlimentoFormDetailComponent } from './../alimento/alimento-form/alimento-form-detail.component';
import { AlimentoRoutingModule } from './../alimento/alimento.routing.module';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';
import { NumberMaskDirectiveModule } from '../../directives/number-mask-directive/number-mask-directive.module';

@NgModule({
    declarations: [
       AlimentoComponent,
       AlimentoFormComponent,
       AlimentoFormDetailComponent
     ],
     imports: [
        AlimentoRoutingModule,
        SharedModule,
        PipesModule,
        NumberMaskDirectiveModule
     ],
     providers: [
        AlimentoService
     ]
})
export class AlimentoModule{}