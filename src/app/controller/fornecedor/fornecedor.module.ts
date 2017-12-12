import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { FornecedorComponent } from './fornecedor.component';
import { FornecedorService } from './fornecedor.service';
import { FornecedorRoutingModule } from './fornecedor.routing.module';
import { SharedModule } from './../shared.module';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorFormDetailComponent } from './fornecedor-form/fornecedor-form-detail.component';

@NgModule({
    declarations: [
       FornecedorComponent,
       FornecedorFormComponent,
       FornecedorFormDetailComponent
     ],
     imports: [
        FornecedorRoutingModule,
        SharedModule
     ],
     providers: [
        FornecedorService
     ]
})
export class FornecedorModule{}