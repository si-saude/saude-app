import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';
import { SharedModule } from './../controller/shared.module';

@NgModule({
    declarations: [
       LoginComponent
     ],
     imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule
     ],
     providers: [
       AuthService
     ]  
})
export class LoginModule{}