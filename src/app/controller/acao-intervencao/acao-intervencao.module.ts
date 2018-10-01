import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AcaoIntervencaoComponent } from '../acao-intervencao/acao-intervencao.component';
import { AcaoIntervencaoService } from '../acao-intervencao/acao-intervencao.service';
import { AcaoIntervencaoFormComponent } from '../acao-intervencao/acao-intervencao-form/acao-intervencao-form.component';
import { AcaoIntervencaoFormDetailComponent } from '../acao-intervencao/acao-intervencao-form/acao-intervencao-form-detail.component';
import { AcaoIntervencaoRoutingModule } from '../acao-intervencao/acao-intervencao.routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       AcaoIntervencaoComponent,
       AcaoIntervencaoFormComponent,
       AcaoIntervencaoFormDetailComponent
     ],
     imports: [
        AcaoIntervencaoRoutingModule,
        SharedModule
     ],
     providers: [
        AcaoIntervencaoService
     ]
})
export class AcaoIntervencaoModule{}