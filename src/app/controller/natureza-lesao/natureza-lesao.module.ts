import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NaturezaLesaoComponent } from './natureza-lesao.component';
import { NaturezaLesaoService } from './natureza-lesao.service';
import { NaturezaLesaoFormComponent } from './natureza-lesao-form/natureza-lesao-form.component';
import { NaturezaLesaoFormDetailComponent } from './natureza-lesao-form/natureza-lesao-form-detail.component';
import { NaturezaLesaoRoutingModule } from './natureza-lesao.routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       NaturezaLesaoComponent,
       NaturezaLesaoFormComponent,
       NaturezaLesaoFormDetailComponent
     ],
     imports: [
        NaturezaLesaoRoutingModule,
        SharedModule
     ],
     providers: [
        NaturezaLesaoService
     ]
})
export class NaturezaLesaoModule{}