import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { HttpModule } from '@angular/http'; 

import { ItemAuditoriaAtestadoComponent } from './item-auditoria-atestado.component';
import { ItemAuditoriaAtestadoService } from './item-auditoria-atestado.service';
import { ItemAuditoriaAtestadoRoutingModule } from './item-auditoria-atestado.routing.module';
import { SharedModule } from './../shared.module'; 
import { ItemAuditoriaAtestadoFormComponent } from './item-auditoria-atestado-form/item-auditoria-atestado-form.component';
import { ItemAuditoriaAtestadoFormDetailComponent } from './item-auditoria-atestado-form/item-auditoria-atestado-form-detail.component';

@NgModule({
    declarations: [
       ItemAuditoriaAtestadoComponent,
       ItemAuditoriaAtestadoFormComponent,
       ItemAuditoriaAtestadoFormDetailComponent
     ],
     imports: [
        ItemAuditoriaAtestadoRoutingModule,
        SharedModule
     ],
     providers: [
        ItemAuditoriaAtestadoService
     ]
})
export class ItemAuditoriaAtestadoModule{}