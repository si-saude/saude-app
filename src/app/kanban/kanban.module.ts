import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { KanbanComponent } from './kanban.component';
import { KanbanService } from './kanban.service';
import { KanbanRoutingModule } from './kanban.routing.module';
import { SharedModule } from './../controller/shared.module';
import { PipesModule } from './../controller/pipes.module';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
    declarations: [
       KanbanComponent
     ],
     imports: [
        KanbanRoutingModule,
        SharedModule,
        MaterializeModule,
        PipesModule,
        DragulaModule
     ],
     providers: [
        KanbanService
     ]
})
export class KanbanModule{}