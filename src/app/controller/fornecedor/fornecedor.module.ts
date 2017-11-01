import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { FornecedorComponent } from './fornecedor.component';
import { FornecedorService } from './fornecedor.service';
import { FornecedorRoutingModule } from './fornecedor.routing.module';
import { SharedModule } from './../shared.module';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';

@NgModule({
    declarations: [
       FornecedorComponent,
       FornecedorFormComponent
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