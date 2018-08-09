import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuditoriaAsoComponent } from './auditoria-aso.component';
import { AuditoriaAsoService } from './auditoria-aso.service';
import { AuditoriaAsoFormComponent } from './auditoria-aso-form/auditoria-aso-form.component';
import { AuditoriaAsoRoutingModule } from './auditoria-aso.routing.module';
import { SharedModule } from './../shared.module';
import { PipesModule } from './../pipes.module';

@NgModule({
    declarations: [
       AuditoriaAsoComponent,
       AuditoriaAsoFormComponent
     ],
     imports: [
        AuditoriaAsoRoutingModule,
        SharedModule,
        PipesModule
     ],
     providers: [
        AuditoriaAsoService
     ]
})
export class AuditoriaAsoModule{}