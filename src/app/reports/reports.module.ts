import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { DataTableModule } from "angular2-datatable";

import { EmpregadosPorGrupoComponent } from './empregados-por-grupo/empregados-por-grupo.component';
import { EmpregadosPorGrupoService } from './empregados-por-grupo/empregados-por-grupo.service';
import { ReportsRoutingModule } from './reports.routing.module';
import { SharedModule } from './../controller/shared.module';
import { FilterDataPipe } from './../pipes/filter-data.pipe';
@NgModule({
    declarations: [
       EmpregadosPorGrupoComponent,
       FilterDataPipe
     ],
     imports: [
        ReportsRoutingModule,
        DataTableModule,
        SharedModule
     ],
     providers: [
        EmpregadosPorGrupoService
     ]
})
export class ReportsModule{}