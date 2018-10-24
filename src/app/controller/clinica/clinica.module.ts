import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClinicaComponent } from '../clinica/clinica.component';
import { ClinicaService } from '../clinica/clinica.service';
import { ClinicaFormComponent } from '../clinica/clinica-form/clinica-form.component';
import { ClinicaFormDetailComponent } from '../clinica/clinica-form/clinica-form-detail.component';
import { ClinicaRoutingModule } from '../clinica/clinica.routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [
       ClinicaComponent,
       ClinicaFormComponent,
       ClinicaFormDetailComponent
     ],
     imports: [
        ClinicaRoutingModule,
        SharedModule
     ],
     providers: [
        ClinicaService
     ]
})
export class ClinicaModule{}