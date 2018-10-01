import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmpresaComponent } from '../empresa/empresa.component';
import { EmpresaService } from '../empresa/empresa.service';
import { EmpresaFormComponent } from '../empresa/empresa-form/empresa-form.component';
import { EmpresaFormDetailComponent } from '../empresa/empresa-form/empresa-form-detail.component';
import { EmpresaRoutingModule } from '../empresa/empresa.routing.module';
import { SharedModule } from '../shared.module';
import { PipesModule } from './../pipes.module';

@NgModule({
    declarations: [
       EmpresaComponent,
       EmpresaFormComponent,
       EmpresaFormDetailComponent
     ],
     imports: [
        EmpresaRoutingModule,
        SharedModule,
        PipesModule
     ],
     providers: [
        EmpresaService
     ]
})
export class EmpresaModule{}