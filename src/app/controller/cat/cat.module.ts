import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { Ng2InputMaskModule } from 'ng2-input-mask';

import { CatComponent } from './cat.component';
import { CatService } from './cat.service';
import { CatFormComponent } from './cat-form/cat-form.component';
import { CatFormDetailComponent } from './cat-form/cat-form-detail.component';
import { CatRoutingModule } from './cat.routing.module';
import { SharedModule } from './../shared.module';
import { CpfPipe } from './../../pipes/cpf.pipe';
import { PlanejamentoModule } from './../planejamento.module';
import { PipesModule } from './../pipes.module';

@NgModule({
    declarations: [
       CatComponent,
       CatFormComponent,
       CatFormDetailComponent,
       CpfPipe
     ],
     imports: [
        MyDatePickerModule,
        CatRoutingModule,
        SharedModule,
        Ng2InputMaskModule,
        PlanejamentoModule,
        PipesModule
     ],
     providers: [
        CatService
     ]
})
export class CatModule{}