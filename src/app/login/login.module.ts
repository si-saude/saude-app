import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [
       LoginComponent
     ],
     imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
     ],
     providers: [
       AuthService
     ]  
})
export class LoginModule{}