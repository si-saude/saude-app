import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IntegerMaskDirective } from './integer-mask-directive'; 

@NgModule( {
    declarations: [
        IntegerMaskDirective
    ],
    imports: [
        FormsModule,
        CommonModule,
        MaterializeModule
    ],
    exports: [
        IntegerMaskDirective
    ]
} )
export class IntegerMaskDirectiveModule { }