import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { PeriodicidadeComponent } from './periodicidade.component';
import { PeriodicidadeService } from './periodicidade.service';
import { PeriodicidadeRoutingModule } from './periodicidade.routing.module';
import { SharedModule } from './../shared.module';
import { PeriodicidadeFormComponent } from './periodicidade-form/periodicidade-form.component';

@NgModule({
    declarations: [
       PeriodicidadeComponent,
       PeriodicidadeFormComponent
     ],
     imports: [
        PeriodicidadeRoutingModule,
        SharedModule
     ],
     providers: [
        PeriodicidadeService
     ]
})
export class PeriodicidadeModule{}