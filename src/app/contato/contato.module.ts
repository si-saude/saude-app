import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContatoComponent } from './contato.component';
import { ContatoService } from './contato.service';

@NgModule({
    declarations: [
       ContatoComponent
     ],
     imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
     ],
     providers: [
       ContatoService
     ]  
})
export class ContatoModule{}