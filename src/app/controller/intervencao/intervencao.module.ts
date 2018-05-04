import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { HttpModule } from '@angular/http'; 

import { IntervencaoComponent } from './intervencao.component';
import { IntervencaoService } from './intervencao.service';
import { IntervencaoRoutingModule } from './intervencao.routing.module';
import { SharedModule } from './../shared.module'; 
import { IntervencaoFormComponent } from './intervencao-form/intervencao-form.component';
import { IntervencaoFormDetailComponent } from './intervencao-form/intervencao-form-detail.component';

@NgModule({
    declarations: [
       IntervencaoComponent,
       IntervencaoFormComponent,
       IntervencaoFormDetailComponent
     ],
     imports: [
        IntervencaoRoutingModule,
        SharedModule
     ],
     providers: [
        IntervencaoService
     ]
})
export class IntervencaoModule{}