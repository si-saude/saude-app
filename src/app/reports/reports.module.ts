import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { DataTableModule } from "angular2-datatable";
import { MaterializeModule } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';

import { EmpregadosPorGrupoComponent } from './empregados-por-grupo/empregados-por-grupo.component';
import { EmpregadosPorGrupoService } from './empregados-por-grupo/empregados-por-grupo.service';
import { PanoramaComponent } from './panorama/panorama.component';
import { SolicitacaoCentralIntegraComponent } from './solicitacao-central-integra/solicitacao-central-integra.component';
import { PanoramaService } from './panorama/panorama.service';
import { ReportsRoutingModule } from './reports.routing.module';
import { SharedModule } from './../controller/shared.module';
import { PipesModule } from './../controller/pipes.module';

@NgModule({
    declarations: [
       EmpregadosPorGrupoComponent,
       PanoramaComponent,
       SolicitacaoCentralIntegraComponent 
     ],
     imports: [
        ReportsRoutingModule,
        DataTableModule,
        SharedModule,
        MyDatePickerModule,
        MaterializeModule,
        PipesModule
     ],
     providers: [
        EmpregadosPorGrupoService,
        PanoramaService
     ]
})
export class ReportsModule{}