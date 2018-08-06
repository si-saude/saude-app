import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImovelComponent } from './imovel.component';
import { ImovelService } from './imovel.service';
import { ImovelFormComponent } from './imovel-form/imovel-form.component';
import { ImovelFormDetailComponent } from './imovel-form/imovel-form-detail.component';
import { ImovelRoutingModule } from './imovel.routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       ImovelComponent,
       ImovelFormComponent,
       ImovelFormDetailComponent
     ],
     imports: [
        ImovelRoutingModule,
        SharedModule
     ],
     providers: [
        ImovelService
     ]
})
export class ImovelModule{}