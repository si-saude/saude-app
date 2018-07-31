import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { AvaliacaoHigieneOcupacionalComponent } from './avaliacao-higiene-ocupacional.component';
import { AvaliacaoHigieneOcupacionalService } from './avaliacao-higiene-ocupacional.service';
import { AvaliacaoHigieneOcupacionalFormComponent } from './avaliacao-higiene-ocupacional-form/avaliacao-higiene-ocupacional-form.component';
import { AvaliacaoHigieneOcupacionalFormDetailComponent } from './avaliacao-higiene-ocupacional-form/avaliacao-higiene-ocupacional-form-detail.component';
import { AvaliacaoHigieneOcupacionalRoutingModule } from './avaliacao-higiene-ocupacional.routing.module';
import { PipesModule } from './../pipes.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       AvaliacaoHigieneOcupacionalComponent,
       AvaliacaoHigieneOcupacionalFormComponent,
       AvaliacaoHigieneOcupacionalFormDetailComponent
     ],
     imports: [
        AvaliacaoHigieneOcupacionalRoutingModule,
        PipesModule,
        SharedModule,
        MyDatePickerModule
     ],
     providers: [
        AvaliacaoHigieneOcupacionalService
     ]
})
export class AvaliacaoHigieneOcupacionalModule{}