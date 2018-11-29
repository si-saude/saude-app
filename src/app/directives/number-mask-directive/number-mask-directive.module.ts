import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NumberMaskDirective } from './number-mask-directive'; 

@NgModule( {
    declarations: [
        NumberMaskDirective
    ],
    imports: [
        FormsModule,
        CommonModule,
        MaterializeModule
    ],
    exports: [
        NumberMaskDirective
    ]
} )
export class NumberMaskDirectiveModule { }