import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MedidaAlimentarComponent } from '../medida-alimentar/medida-alimentar.component';
import { MedidaAlimentarService } from '../medida-alimentar/medida-alimentar.service';
import { MedidaAlimentarFormComponent } from '../medida-alimentar/medida-alimentar-form/medida-alimentar-form.component';
import { MedidaAlimentarFormDetailComponent } from '../medida-alimentar/medida-alimentar-form/medida-alimentar-form-detail.component';
import { MedidaAlimentarRoutingModule } from '../medida-alimentar/medida-alimentar.routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       MedidaAlimentarComponent,
       MedidaAlimentarFormComponent,
       MedidaAlimentarFormDetailComponent
     ],
     imports: [
        MedidaAlimentarRoutingModule,
        SharedModule
     ],
     providers: [
        MedidaAlimentarService
     ]
})
export class MedidaAlimentarModule{}