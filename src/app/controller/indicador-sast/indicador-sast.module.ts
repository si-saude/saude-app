import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { HttpModule } from '@angular/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndicadorSastComponent } from './indicador-sast.component';
import { IndicadorSastService } from './indicador-sast.service';
import { IndicadorSastRoutingModule } from './indicador-sast.routing.module';
import { SharedModule } from './../shared.module'; 
import { IndicadorSastFormComponent } from './indicador-sast-form/indicador-sast-form.component';
import { IndicadorSastFormDetailComponent } from './indicador-sast-form/indicador-sast-form-detail.component';

@NgModule({
    declarations: [
       IndicadorSastComponent,
       IndicadorSastFormComponent,
       IndicadorSastFormDetailComponent
     ],
     imports: [
        IndicadorSastRoutingModule,
        SharedModule
     ],
     providers: [
        IndicadorSastService
     ]
})
export class IndicadorSastModule{}