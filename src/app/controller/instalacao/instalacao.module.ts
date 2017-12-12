import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { HttpModule } from '@angular/http'; 

import { MyDatePickerModule } from 'mydatepicker';

import { InstalacaoComponent } from './instalacao.component';
import { InstalacaoService } from './instalacao.service';
import { InstalacaoRoutingModule } from './instalacao.routing.module';
import { SharedModule } from './../shared.module'; 
import { InstalacaoFormComponent } from './instalacao-form/instalacao-form.component';
import { InstalacaoFormDetailComponent } from './instalacao-form/instalacao-form-detail.component';

@NgModule({
    declarations: [
       InstalacaoComponent,
       InstalacaoFormComponent,
       InstalacaoFormDetailComponent
     ],
     imports: [
        InstalacaoRoutingModule,
        MyDatePickerModule,
        SharedModule
     ],
     providers: [
        InstalacaoService
     ]
})
export class InstalacaoModule{}